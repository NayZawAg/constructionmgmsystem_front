import { yupResolver } from '@hookform/resolvers/yup';
// import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NextPageWithLayout } from '../_app';
import { addConstruction, getConstructionWithStatus } from '@/api/construction';
import ConstructionForm, {
  ConstructionInputSchema,
  ConstructionType,
} from '@/components/constructions/constructionForm';
import { ToastContext } from '@/components/context/toast/toast';
import { TypeConstructionDetail } from '@/types/api/construction';
import { PAGE_URL } from '@/utils/constants/common';
import { MESSAGES } from '@/utils/constants/message';
import { convertDataToConstructionCreateRequest } from '@/utils/convertDataToRequestBody/construction';
import { validationErrorMessageHtmlFormat } from '@/utils/messageUtils';
import { toastErrorMessage, toastMessage } from '@/utils/toastMessage';

const CreateConstructionsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { toast } = useContext(ToastContext);

  // 複製ボタン
  const id = Number(router.query.id);
  const status = Number(router.query.status);

  const [construction, setConstruction] = useState<TypeConstructionDetail>();
  useEffect(() => {
    const fetchConstructionData = async () => {
      if (!isNaN(id)) {
        await getConstructionWithStatus(id, status)
          .then((response) => {
            setConstruction(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    // fetch construction
    fetchConstructionData();
  }, [id, status]);

  /** form **/
  const formMethods = useForm<ConstructionType>({
    mode: "onChange",
    resolver: yupResolver(ConstructionInputSchema),
    defaultValues: {
      construction_code: '',
      construction_name: '',
      east_west_division: undefined,
      new_repair_division: undefined,
      main_brand_id: '',
      sub_brand1_id: '',
      sub_brand2_id: '',
      customer_id: '',
      customer_department_name: '',
      // contractor_name: '',
      contract_email_address: '',
      zipcode: '',
      prefecture: '',
      municipality: '',
      address_1: '',
      address_2: '',
      phone_no: '',
      structure_rc: false,
      structure_s: false,
      structure_src: false,
      structure_wooden: false,
      ground_floor: undefined,
      underground_floor: undefined,
      // construction_content: '',
      construction_content: '',
      site_area: undefined,
      building_area: undefined,
      total_floor_area: undefined,
      product: '',
      schedule_construction_start_date: undefined,
      schedule_construction_end_date: undefined,
      updated_at: '',
      estimated_date: '',
      order_date: '',
      contract_date: '',
      assumption_artificial: undefined,
      status: '',
      dr0: '',
      dr1: '',
      dr2: '',
      estimated_amount: undefined,
      estimated_assumption_cost: undefined,
      order_amount: undefined,
      order_assumption_cost: undefined,
      work_place_score: undefined,
      gross_profit_amount_1: undefined,
      gross_profit_amount_2: undefined,
      gross_profit_amount_3: undefined,
      gross_profit_amount_4: undefined,
      gross_profit_amount_5: undefined,
      gross_profit_rate_1: undefined,
      gross_profit_rate_2: undefined,
      gross_profit_rate_3: undefined,
      gross_profit_rate_4: undefined,
      gross_profit_rate_5: undefined,
      sales_amount: undefined,
      working_budget: undefined,
      additional_increase_decrease: undefined,
      // assessment_turnover: undefined,
      // total_expenses: undefined,
      // expenses: undefined,
      // unordered_budget: undefined,
      // existing_order_amount: undefined,
      user_review: '',
      construction_completion_date: '',
      fire_inspection_date: '',
      confirmation_application: '',
      final_expected_cost: undefined,
      assessment_amount: undefined,
    },
    shouldFocusError: false,
  });

  const onSubmit = (data: ConstructionType) => {
    const requestBody = convertDataToConstructionCreateRequest(data);
    addConstruction(requestBody)
      .then(() => {
        router.push(PAGE_URL.USER.CONSTRUCTION.SEARCH);
        toast.current?.show(
          toastMessage(MESSAGES.API_RESULT.CREATE.SUCCESS('工事')),
        );
      })
      .catch((e) => {
        if (e.response.status == 422) {
          // let error_msg = '';
          // if (typeof e.response.data.error == 'string') {
          //   toast.current?.show(toastErrorMessage(e.response.data.error));
          // } else if (typeof e.response.data.error == 'object') {
          //   Object.keys(e.response.data.error).map((item) => {
          //     error_msg += e.response.data.error[item][0] + '。';
          //   });
          //   toast.current?.show(toastErrorMessage(error_msg));
          // }
          const error_msg = validationErrorMessageHtmlFormat(e.response.data.error)
          toast.current?.show(toastErrorMessage(<div dangerouslySetInnerHTML={{__html: error_msg }}></div>));
        } else {
          toast.current?.show(
            toastErrorMessage(MESSAGES.API_RESULT.CREATE.FAILURE('工事')),
          );
        }
      });
  };

  if (!isNaN(id) && !construction) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>工事追加</title>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      {isNaN(id) ? (
        <ConstructionForm
          isCreate={true}
          formMethods={formMethods}
          onSubmit={onSubmit}
          formStatus="CONSTRUCTION_CREATE"
        />
      ) : (
        <ConstructionForm
          isCreate={false}
          construction={construction}
          formMethods={formMethods}
          onSubmit={onSubmit}
          formStatus="CONSTRUCTION_CREATE"
        />
      )}
    </>
  );
};

CreateConstructionsPage.auth = true;
CreateConstructionsPage.pageId = 'EU_CONSTRUCTION_NEW';

export default CreateConstructionsPage;
