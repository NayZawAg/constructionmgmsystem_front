/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
import type { NextPage } from 'next';
import Head from 'next/head';
import ResetPasswordForm from '@/components/cooperators/resetPasswordForm';

const ResetPassword: NextPage = () => {
  return(
    <>
      <Head>
        <title>パスワード変更</title>
      </Head>
      {/* Login Information */}
      <div className="formgrid grid">
        <div className="field col-12 pt-2 text-center pr-4 pl-4 mb-0 font-bold"><p>下記ユーザーパスワードを変更いたします。</p></div>
      </div>
      <div className="formgrid grid">
        <div className="field col-12 pt-1 text-center pr-4 pl-4 mb-0"><p>新しいパスワード、確認用のパスワードを入力し、パスワードを変更するボタンをクリックするとパスワードが変更されます。</p></div>
      </div>
      <div className="formgrid grid">
        <div className="field col-12 pt-1 text-center pr-4 pl-4 mb-0"><p>パスワードではログインができなくなりますので、ご注意ください。</p></div>
      </div>
      {/* label */}
      <div className="formgrid grid">
        <div className="field col-6 pt-2 text-right pr-4 pl-4 mb-0"><label>ID:</label></div>
        <div className="field col-6 pt-2 text-left pr-4 pl-4 mb-0"><label>00121</label></div>
      </div>
      <div className="formgrid grid">
        <div className="field col-6 pt-2 text-right pr-4 pl-4 mb-0"><label>会社名:</label></div>
        <div className="field col-6 pt-2 text-left pr-4 pl-4 mb-0"><label>〇〇株式会社</label></div>
      </div>
      <div className="formgrid grid">
        <div className="field col-6 pt-2 text-right pr-4 pl-4 mb-0"><label>部署名:</label></div>
        <div className="field col-6 pt-2 text-left pr-4 pl-4 mb-0"><label>〇〇支店</label></div>
      </div>
      <ResetPasswordForm/>
    </>
  )
}
export default ResetPassword