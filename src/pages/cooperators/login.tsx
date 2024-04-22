/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
import { yupResolver } from '@hookform/resolvers/yup';
import type { NextPage } from 'next'
import Head from 'next/head';
import { Button } from 'primereact/button';
import { useState, useEffect } from "react";
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';
import { ContentHeadingInline } from '@/components/forms/contentHeading/contentHeadingInline';
import { InputForm } from '@/components/forms/input/input';
import 'primeicons/primeicons.css';
import { LoginDialog } from '@/components/login/loginDialog';
import { BaseYup } from '@/utils/baseYup';

const LoginInputSchema = BaseYup.object({
  id: BaseYup.string().required('必須フィールドです'),
  password: BaseYup.string().required('必須フィールドです')
});
export type LoginInputData = yup.InferType<typeof LoginInputSchema>;
const LoginPage: NextPage = () => {
  const formMethods = useForm<LoginInputData>({
    resolver: yupResolver(LoginInputSchema),
    defaultValues: { id: '',password: '' },
  });
  const { setValue, handleSubmit, formState: { errors} } = formMethods
  const [documentAddModal, setDocumentAddModal] = useState<boolean>(false)
  const onSubmit = async (data: LoginInputData) => {
    return ""
  };
  return (
    <>
      <Head>
        <title>ログイン</title>
      </Head>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>      
          <div className="card form mt-8">
            <div className="flex justify-content-center flex-wrap card-container yellow-container mb-2 mt-8">
              <div className="flex justify-content-center flex-wrap card-container yellow-container mb-2 mt-8">
                <div className="flex align-items-center justify-content-center w-10rem  mx-2">
                  <ContentHeadingInline heading="ID"/>
                </div>
                <div className="flex align-items-center justify-content-center w-25rem">
                  <InputForm
                    name="id"
                    className="w-15rem"
                    onChange={(e)=> {  setValue("id",e.target.value);}}
                    errorMessage={errors.id?.message}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-content-center flex-wrap card-container">
              <div className="flex align-items-center justify-content-center w-10rem  mx-2">
                <ContentHeadingInline heading="パスワード"/>
              </div>
              <div className="flex align-items-center justify-content-center w-25rem">
                <InputForm
                  name="password"
                  type="password"
                  className="w-15rem"
                  onChange={(e)=> {setValue("password",e.target.value);}}
                  errorMessage={errors.password?.message}
                />
              </div>
            </div>
            <div className="flex justify-content-center flex-wrap card-container">
              <div className="flex align-items-center justify-content-end w-26rem pr-0 mr-0 mb-5">
                <Button  type="button" onClick={() => setDocumentAddModal(true)}  label="パスワードを忘れた場合" className="p-button-link mr-0 pr-0 text-blue-400" />
                <LoginDialog
                  isOpen={documentAddModal}
                  onHide={() => setDocumentAddModal(false)}
                />
              </div>
            </div>
            <div className="flex justify-content-center flex-wrap card-container">
              <div className="flex align-items-center justify-content-center w-28rem mr-5">
                <Button
                  id="button"
                  label={'ログイン'}
                  className="p-button-success w-full"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  )
}
export default LoginPage
  