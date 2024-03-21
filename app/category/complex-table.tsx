"use client";

import { useState, useEffect } from "react";
import {
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";

import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,

  SortingState,
} from "@tanstack/react-table";
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
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import CardSkeleton from "./loading";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  categoryRequestAction,
  categoryCreateRequestAction,
  categoryUpdateRequestAction,
  categoryDeleteRequestAction,
  categoryStatusRequestAction,
} from "@/redux/category/categoryAction";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";
export default function ComplexTable() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const category = useSelector((state: any) => state.category.data);
  const {
    category_success,
    category_error,
    isUpdated,
    isdeleted,
    isStatusUpdated,
    category_validation_error,
    isFetching
  } = useSelector((state: any) => state.category);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categories, setCategories] = useState([
    { categoryId: "1", category: "Example Category 1", status: 1 },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const totalRows =
    (category && category.pagination && category.pagination.total) || 0;
  const items = category && category.data ? category.data : [];
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const formSchema = z.object({
    category_name: z
      .string()
      .min(1, { message: "Please enter a category name." }),
      id: z.string().optional()
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category_name: " ",
      id: ''
    },
  });
  const customStylesDark = {
    headCells: {
      style: {
        backgroundColor: "black",
        color: "white",
      },
    },
    cells: {
      style: {
        backgroundColor: "black",
        color: "white",
      },
    },
    actionCells: {
      style: {
        backgroundColor: "black",
        color: "white",
      },
    },
    pagination: {
      style: {
        backgroundColor: "black",
        color: "white",
      },
    },
  };

  function handleEdit(categoryId: any, row: any) {
    form.reset({
      category_name: row.category_name,
      id: row._id,
    });
    setEditingCategory(row._id); // Track the category being edited
    setIsModalOpen(true);
  }

  const handleDeleteClick = (rowId: any) => {
    setIsDialogOpen(true);
    setSelectedRowId(rowId);
  };

  const deleteCategory = (rowId: any, status: any) => {

    let data = {
      category_id: rowId,
      is_active: status,
    };
    dispatch(categoryDeleteRequestAction(data));
  };

  const saveCategory = (categoryData:any) => {
    setCategories((currentCategories) => {
      const existingIndex = currentCategories.findIndex(
        (cat) => cat.categoryId === categoryData.categoryId
      );

      if (existingIndex > -1) {
        const updatedCategories = [...currentCategories];
        updatedCategories[existingIndex] = {
          ...updatedCategories[existingIndex],
          ...categoryData,
        };
        return updatedCategories;
      } else {
        const newCategory = {
          ...categoryData,
          categoryId:
            categoryData.categoryId || Math.random().toString(36).substr(2, 9), // Keep existing ID or generate a new one
          status: 1, // Default status
        };
        return [...currentCategories, newCategory];
      }
    });
  };
  const toggleStatus = (categoryId: any, status: any) => {
    let data = {
      category_id: categoryId,
      is_active: status === false ? 1 : 0,
    };
    dispatch(categoryStatusRequestAction(data));
  };
  const columns = [
    {
      name: "Category Name",
      selector: (row: any) => row.category_name,
      sortable: true,
      maxWidth: "300px",
    },
    {
      name: "Status",
      maxWidth: "300px",
      cell: (row:any) => (
        <div className="flex items-center space-x-2">
          <Switch
            id={`airplane-mode`}
            checked={row.is_active === true}
            onClick={() => toggleStatus(row._id, row.is_active)}
          />
        </div>
      ),
    },
    {
      name: "Action",
      button: true,
      cell: (row:any) => (
        <div>
          <button
            title="Edit"
            onClick={() => handleEdit(row._id, row)}
            style={{ border: "none", background: "none" }}
            className="text-black-200 hover:text-blue-400"
          >
            <Pencil2Icon
              style={{ height: "22px", width: "30px" }}
              className="mr-2"
            />
          </button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              {/* <Button variant='outline'>Show Dialog</Button> */}
              <button
                title="Delete"
                onClick={() => handleDeleteClick(row.id)}
                style={{ border: "none", background: "none" }}
                className="text-black-200 hover:text-red-400"
              >
                <TrashIcon
                  style={{ height: "22px", width: "30px" }}
                  className="mr-2"
                />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to delete the category
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteCategory(row._id, row.is_active)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];


  const [rowSelection, setRowSelection] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data:any) => {
    setIsSubmitting(true);

    if (editingCategory) {
      data = {
        ...data,
        category_id: editingCategory,
      };

      dispatch(categoryUpdateRequestAction(data));
    } else {
      saveCategory(data);
      data = {
        ...data,
        status: 1,
      };
      dispatch(categoryCreateRequestAction(data));
    }

    setIsSubmitting(false);
    setIsModalOpen(false);
    setEditingCategory(null);
    form.reset();
  };
  // table pagination

  //pagination
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  // const [currentData ,setCurrentdata] = useState("")
  let timeOut:any = 0;
  //orderby
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const fetchSettingsData = (
    pageV: any,
    limitV: any,
    orderV: any,
    orderByV: any,
    keywordV: any
  ): void => { 

    dispatch(categoryRequestAction({
      payload: {
        page: pageV,
        limit: limitV,
        order: orderV,
        direction: orderByV,
        keyword: keywordV,
      },
    }));
  };

  useEffect(() => {
    if (category_success) {
      toast({
        variant: "success",
        title: "Category created Successfullyy",
      });
    }
    if (category_error) {
      toast({
        variant: "destructive",
        title: category_error,
      });
    }
    if (isUpdated) {
      toast({
        variant: "success",
        title: "Category updated Successfully",
      });
    }
    if (isdeleted) {
      toast({
        variant: "success",
        title: "Category deleted Successfully",
      });
    }
    if (isStatusUpdated) {
      toast({
        variant: "success",
        title: "Category status updated Successfully",
      });
    }
    if (
      Array.isArray(category_validation_error) &&
      category_validation_error.length > 0
    ) {
      category_validation_error.forEach((errorMessage) => {
        toast({
          variant: "destructive",
          title: errorMessage,
        });
      });
    }
  }, [
    category_success,
    category_error,
    isUpdated,
    isdeleted,
    isStatusUpdated,
    category_validation_error,
  ]);

  
  useEffect(() => {
   fetchSettingsData(page, limit, order, orderBy, searchString);
  }, []);

  useEffect(() => {

    if (category_success || category_error || isUpdated || isdeleted || isStatusUpdated) {
      fetchSettingsData(page, limit, order, orderBy, searchString);
    }

  }, [category_success, category_error, isUpdated, isdeleted, isStatusUpdated]);

  const handlePageChange = (page:any) => {
    setPage(page);
    fetchSettingsData(page, limit, order, orderBy, searchString);
  };
  const handlePerRowsChange = async (newPerPage:any, page:any) => {
    setLimit(newPerPage);
    fetchSettingsData(page, newPerPage, order, orderBy, searchString);
  };


  const OnSearch = (e:any) => {


    const value = e.target.value;

    if (timeOut) clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setPage(1);
      setSearchString(value);
      fetchSettingsData(page, limit, order, orderBy, value);
    }, 300);

  };

  //orderby
  const handleSort = (column:any, sortDirection:any) => {
    if (sortDirection) {
      setOrder(sortDirection);
      setOrderBy("category");
    }
  };

  useEffect(() => {
    if (order || orderBy) {
      fetchSettingsData(page, limit, order, orderBy, searchString);
    }
  }, [order, orderBy]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Input
          placeholder="Filter category name..."
          className="max-w-sm"
          onChange={(e) => OnSearch(e)}
        />
        <Button
          variant="outline"
          onClick={() => {
            setEditingCategory(null);
            form.reset({
              category_name: "",
            });
            setIsModalOpen(true);
          }}
        >
          Create
        </Button>
      </div>
      <div className="h-[400px] overflow-auto rounded-md border items-center justify-center items-center">
        {isLoading ? (
          <div>
            <CardSkeleton />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={items}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
            paginationComponentOptions={{
              rowsPerPageText: "Items per page:",
              rangeSeparatorText: "of",
            }}
            customStyles={theme === "dark" ? customStylesDark : {}}
            sortServer
            onSort={handleSort}
            noDataComponent={null}
          />
        )}
      </div>

      {isModalOpen && (
        <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
          <SheetContent side="center" showClose={true}>
            <SheetHeader>
              <SheetTitle>
                {editingCategory ? "Edit Category" : "Create New Category"}
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="category_name"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Category Name"
                          {...field}
                          name="category_name"
                          className={error ? "erStyle" : ""}
                        />
                      </FormControl>
                      {error && <FormMessage>{error.message}</FormMessage>}
                    </FormItem>
                  )}
                />
                {isSubmitting ? (
                  <Button disabled className="w-full">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit" className="w-full">
                    Create
                  </Button>
                )}
              </form>
            </Form>
            <SheetFooter></SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
