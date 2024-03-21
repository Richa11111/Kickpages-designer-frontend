"use client";
import { FC, useState, useEffect, useRef } from "react";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CardSkeleton from "./loading";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as TemplateAction from "@/redux/template/templateAction";
import { toast } from "@/components/ui/use-toast";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import MyPaginationComponent from "./Pagination";
import { bindActionCreators } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import { Loader2 } from "lucide-react";
const ComplexTable: FC<any> = (props) => {
  const dispatch = useDispatch();
  const category_list = useSelector((state: any) => state.template.category);
  const isTemplateCreated = useSelector(
    (state: any) => state.template.isTemplateCreated
  );
  const category = useSelector((state: any) => state.category.data);
  const { TemplateState, actions } = props;
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [categoryError, setcategoryError] = useState(false);

  const formSchema = z.object({
    category: z.string().min(1, { message: "Please enter a category name." }),
  });
  interface EditDataType {
    _id: any;
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
    },
  });



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<EditDataType | null>(null);
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("All");


  let timeOut = 0;
  useEffect(() => {
    actions.templatEFetchRequestAction({ page: 1 , limit, searchQuery });
  }, [searchQuery]);
  useEffect(() => {
    actions.templateCategoriesRequestAction();
  }, []);
  useEffect(() => {
    if (TemplateState?.isEdited) {
      actions.templatEFetchRequestAction({ page, limit });
    }
  }, [TemplateState?.isEdited]);

  const handleSubmit = (event: any) => {
    setSubmitting(true);
    event.preventDefault();

    const jsonFile = jsonInputRef.current?.files?.[0]; // The '?' is optional chaining
    const thumbnailFile = thumbnailInputRef.current?.files?.[0]; // The '?' is optional chaining

    if (!jsonFile || !thumbnailFile) {
      console.error("File inputs are missing files.");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("template", jsonFile);
    formData.append("image", thumbnailFile);
    formData.append("categoryId", value); // Assuming 'value' is defined elsewhere in your code

    actions.templateCreateRequestAction(formData);
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    if (jsonInputRef.current?.files?.length) {
      formData.append("template", jsonInputRef.current.files[0]);
    }

    if (thumbnailInputRef.current?.files?.length) {
      formData.append("image", thumbnailInputRef.current.files[0]);
    }

    formData.append("CategoryId", value);

    if (editData && editData?._id) {
      actions.templateEditRequestAction(formData, editData._id);
    } else {
      console.error('Edit data or ID is missing.');
    }
    setEditIsModalOpen(false);
  };


  const handlePageChange = (newPage: any) => {
    setPage(newPage); // Update the local state

    actions.templatEFetchRequestAction({ page: newPage, limit });
  };


  const deleteCategory = (rowId: any) => {
    actions.templateDeleteRequestAction(rowId);
  };


  const handleEditClick = (row: any) => {
    setEditData(row);
    setValue(row.categoryId);
    setEditIsModalOpen(true);
  };


  useEffect(() => {
    if (TemplateState?.isTemplateCreated) {
      toast({
        variant: "success",
        title: "Template created successfullly",
      });
    }
    if (TemplateState?.isDeleted) {
      toast({
        variant: "success",
        title: "Template deleted successfullly",
      });
    }
    if (TemplateState?.isEdited) {
      toast({
        variant: "success",
        title: "Template edited successfullly",
      });
    }
    if (TemplateState?.errorMessage) {
      toast({
        variant: "destructive",
        title: "Something went wrong.Try again later",
      });
      setSubmitting(false);
    }
  }, [
    TemplateState?.isTemplateCreated,
    TemplateState?.isDeleted,
    TemplateState?.isEdited,
    TemplateState?.errorMessage,
  ]);

  useEffect(() => {
    if (TemplateState?.isDeleted) {
      const itemsAfterDeletion = TemplateState.template?.data?.length ?? 0;
      if (itemsAfterDeletion === 1 && page > 1) {
        const newPage = page - 1;
        setPage(newPage);

        actions.templatEFetchRequestAction({
          page: newPage,
          limit,
          searchQuery,
        });
      } else {
        actions.templatEFetchRequestAction({ page, limit, searchQuery });
      }
    }
  }, [
    TemplateState?.isDeleted,
    TemplateState.template?.data,
    page,
    limit,
    searchQuery,
    dispatch,
  ]);
  useEffect(() => {
    if (TemplateState?.isTemplateCreated) {
      const totalItems =
        (TemplateState.template && TemplateState.template?.totalItems) || 0;
      const itemsOnCurrentPageAfterAddition = totalItems % 12;
      if (
        itemsOnCurrentPageAfterAddition > 12 ||
        itemsOnCurrentPageAfterAddition === 1
      ) {
        const newPage = Math.ceil(totalItems / 12);
        setPage(newPage);

        actions.templatEFetchRequestAction({
          page: newPage,
          limit,
          searchQuery,
        });
      } else {
        actions.templatEFetchRequestAction({ page, limit, searchQuery });
      }
      setSubmitting(false);
      setIsModalOpen(false);
    }
  }, [
    TemplateState?.isTemplateCreated,
    category,
    page,
    limit,
    searchQuery,
    dispatch,
  ]);

  
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <CardContent>
          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={searchOpen}
                className="w-[200px] justify-between"
              >
                {
                  searchQuery && searchQuery !== "All"
                    ? category_list.find(
                      (category: any) => category._id === searchQuery
                    )?.category_name
                    : "All" // Display "All" by default or when 'All' is selected
                }
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search category..."
                  className="h-9"
                />
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    key="All"
                    onSelect={() => {
                      setSearchQuery("All"); // Here 'All' is the value you're comparing with
                      setSearchOpen(false);
                    }}
                  >
                    All
                    <CheckIcon
                      className={
                        searchQuery === "All"
                          ? "ml-auto h-4 w-4 opacity-100"
                          : "ml-auto h-4 w-4 opacity-0"
                      }
                    />
                  </CommandItem>
                  {category_list.map((category: any) => (
                    <CommandItem
                      key={category._id}
                      onSelect={() => {
                        setSearchQuery(category._id);
                        setSearchOpen(false);
                      }}
                    >
                      {category.category_name}
                      <CheckIcon
                        className={
                          searchQuery === category._id
                            ? "ml-auto h-4 w-4 opacity-100"
                            : "ml-auto h-4 w-4 opacity-0"
                        }
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </CardContent>
        <Button
          variant="outline"
          onClick={() => {
            setEditingCategory("");
            form.reset({
              category: "",
            });
            setIsModalOpen(true);
            // setValue("");
            if (category_list && category_list.length > 0) {
              setValue(category_list[0]._id);
            } else {
            }
          }}
        >
          Create
        </Button>
      </div>
      <div className="h-[400px] overflow-auto rounded-md border items-center justify-center items-center">
        {TemplateState?.isFetching || TemplateState.template === undefined ? (
          <div>
            <CardSkeleton />
          </div>
        ) : (
          <div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                {TemplateState.template?.data?.map((item: any) => (
                  <div
                    key={item._id}
                    className="group relative border rounded overflow-hidden shadow-lg"
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_API
                        }/${item.img.replace(/\\/g, "/")}`}
                      alt={item.category}
                      style={{ width: "288px", height: "162px" }}
                    />

                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
                      <div className="text-center text-white">
                        <p className="font-bold">{item.category}</p>
                        <div className="flex justify-center space-x-2 mt-2">
                          <button
                            onClick={() => handleEditClick(item)}
                            className="text-blue-200 hover:text-blue-400"
                          >
                            <Pencil2Icon className="h-6 w-6" />
                          </button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button className="text-red-200 hover:text-red-400">
                                <TrashIcon className="h-6 w-6" />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Do you want to delete the template
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteCategory(item._id)}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
          <SheetContent side="center" showClose={true}>
            <SheetHeader>
              <SheetTitle>Upload Template</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>

            <Card>
              <CardHeader>
                <CardTitle>Select Category</CardTitle>
              </CardHeader>
              <CardContent>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {value
                        ? category_list?.find(
                          (category: any) => category._id == value
                        )?.category_name
                        : "Select category..."}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search category..."
                        className="h-9"
                      />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {category_list?.map((category: any) => (
                          <CommandItem
                            key={category._id}
                            onSelect={() => {
                              setValue(
                                category._id === value ? "" : category._id
                              );
                              setOpen(false);
                            }}
                          >
                            {category.category_name}
                            <CheckIcon
                              className={
                                value === category._id
                                  ? "ml-auto h-4 w-4 opacity-100"
                                  : "ml-auto h-4 w-4 opacity-0"
                              }
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </CardContent>
              <form onSubmit={handleSubmit}>
                <div className="ml-5 mb-5">
                  <CardTitle>Upload template json</CardTitle>
                </div>
                <div className="ml-5 mb-5 mr-5">
                  <Input id="json" type="file" ref={jsonInputRef} required />
                </div>
                <div className="ml-5 mb-5">
                  <CardTitle>Upload Thumbnail image (PNG format)</CardTitle>
                </div>
                <div className="ml-5 mb-5 mr-5">
                  <Input
                    id="thumbnail"
                    type="file"
                    ref={thumbnailInputRef}
                    required
                    accept="image/png"
                  />
                </div>

                <SheetFooter>
                  {submitting ? (
                    <Button disabled className="w-full">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button type="submit" className="w-full">
                      Upload
                    </Button>
                  )}
                </SheetFooter>
              </form>
            </Card>
            {/* Form content ends here */}
          </SheetContent>
        </Sheet>
      )}
      {isEditModalOpen && (
        <Sheet open={isEditModalOpen} onOpenChange={setEditIsModalOpen}>
          <SheetContent side="center" showClose={true}>
            <SheetHeader>
              <SheetTitle>Edit Template</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>

            <Card>
              <CardHeader>
                <CardTitle>Select Category</CardTitle>
              </CardHeader>
              <CardContent>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {value
                        ? category_list?.find(
                          (category: any) => category._id === value
                        )?.category_name
                        : "Select category..."}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search category..."
                        className="h-9"
                      />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {category_list?.map((category: any) => (
                          <CommandItem
                            key={category._id}
                            onSelect={() => {
                              setValue(
                                category._id === value ? "" : category._id
                              );
                              setOpen(false);
                            }}
                          >
                            {category.category_name}
                            <CheckIcon
                              className={
                                value === category._id
                                  ? "ml-auto h-4 w-4 opacity-100"
                                  : "ml-auto h-4 w-4 opacity-0"
                              }
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </CardContent>
              <form onSubmit={handleEditSubmit}>
                <div className="ml-5 mb-5">
                  <CardTitle>Upload template json</CardTitle>
                </div>
                <div className="ml-5 mb-5 mr-5">
                  <Input id="json" type="file" ref={jsonInputRef} />
                </div>
                <div className="ml-5 mb-5">
                  <CardTitle>Upload Thumbnail image (PNG format)</CardTitle>
                </div>
                <div className="ml-5 mb-5 mr-5">
                  <Input
                    id="thumbnail"
                    type="file"
                    ref={thumbnailInputRef}
                    accept="image/png"
                  />
                </div>

                <SheetFooter>
                  <Button type="submit" className="mt-5 mb-2 mr-3">
                    Upload
                  </Button>
                </SheetFooter>
              </form>
            </Card>
          </SheetContent>
        </Sheet>
      )}
      {TemplateState?.pagination.totalPages ? (
        <MyPaginationComponent
          totalPages={TemplateState?.pagination.totalPages}
          currentPage={TemplateState?.pagination.currentPage}
          onPageChange={handlePageChange}
        />
      ) : (
        ""
      )}
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({
  TemplateState: state.template,
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(TemplateAction as any, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComplexTable);
