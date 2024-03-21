"use client"

import { FC, useEffect, useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
// import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { signIn } from "next-auth/react";
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../../../redux/rootReducer';
import * as LoginActions from '../../../redux/signin/signInActions';

import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface Props {
  signInState: any;
  actions: typeof LoginActions;
}

const AuthForm: FC<Props> = (props) => {

  const { signInState, actions } = props;

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(1, { message: "Invalid password" }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    if (typeof signInState !== 'undefined') {
      setLoading(false);
      const variantType = signInState?.resData?.status === 'success' ? "success" : "destructive";
      const message = signInState?.resData?.message;

      if (typeof message !== 'undefined' && message !== '' && message !== null) {
        toast({
          variant: variantType,
          title: message,
        });
      }
      if (variantType === 'success') {
        router.replace('/template');
      }
    }
  }, [signInState])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);
 
    actions.loginUserAction({
      email_id: values.email,
      password: values.password,
    });
  }

  const {
    formState: { errors },
  } = form

  const erStyle = "border-red-500 focus-visible:ring-red-500 shadow-sm-red-400"

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Enter Email Address'
                      {...field}
                      className={errors.email && erStyle}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Enter Password'
                    type='password'
                    {...field}
                    className={errors.password && erStyle}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' disabled={loading}>
            {loading && <Loader2 className='mr-2 animate-spin' size={16} />}
            Submit
          </Button>
          {/* <FormItem className='text-sm'>
            <label htmlFor='remember' className='flex items-center font-normal'>
              <Checkbox className='mr-2' id='remember' /> Remember this device.
            </label>
          </FormItem> */}
        </form>
      </Form>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  signInState: state.signIn,
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(LoginActions as any, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);