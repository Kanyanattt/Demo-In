import React, { useState, useEffect } from 'react'
import { useObserver } from 'mobx-react-lite';
import { Button, Input, Form, Empty } from 'antd';
import { choiceTopic } from '../../mockdata/data'
import { useStore } from '../../stores';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import WalletList from '../../components/WalletList';
import { numberFormat } from '../../Util'

const index = () => {
  const { dataStore } = useStore()
  const [form] = Form.useForm();
  const [choice, setChoice] = useState(1)
  const [saveWALLET, setSaveWALLET] = useState([])
  const [totalBalance, setTotalBalance] = useState(dataStore.totalBalance);
  // console.log(totalBalance)

  useEffect(() => {
    setTotalBalance(dataStore.totalBalance);
  }, [dataStore.totalBalance]);
  const onChooseTopic = (topic) => {
    setChoice(topic)
  }

  const onFinish = async (values) => {
    const newEntry = {
      id: uuidv4(),
      ...values,
      time: moment().format('dddd MM/YYYY HH:mm')
    };
    if (choice === 1) {
      newEntry.StatusIncome = true;
    } else {
      newEntry.StatusExpense = true;
    }
    // setSaveWALLET([...saveWALLET, newEntry]);
    await dataStore.setBalanceDetail([...dataStore.balanceDetail, newEntry]);
    form.resetFields();
  };

  return useObserver(() => (
    <div className='w-full min-h-screen flex flex-col justify-between  bg-slate-600 pt-8'>
      <div className='flex flex-col w-full'>
        <div className='text-[#FFFFFF] font-bold text-4xl text-center'>WALLET STORY</div>
        <div className='w-full flex justify-center  '>
          <div className='w-fit flex gap-2 justify-center mt-8 border rounded-full'>
            {choiceTopic.map((item, ind) =>
              <div key={item.id}
                className={` ${choice == item.id ? 'text-[#000000] bg-[#FFFFFF]' : 'text-[#ffffff]'} cursor-pointer font-bold text-lg text-center  rounded-full w-36 py-1`}
                onClick={() => onChooseTopic(item.id)}
              >
                {item.title}
              </div>
            )}
          </div>
        </div>
        <div className='w-full flex flex-col gap-4 justify-center items-center mt-8'>
          <div className='text-sm font-bold text-slate-900'>{`${choice == 1 ? 'Please enter your income.' : 'Please enter your expense.'}`}</div>
          <Form
            form={form}
            className='w-fit flex flex-col items-center justify-center '
            onFinish={onFinish}
          >
            <Form.Item
              name={`${choice == 1 ? 'DetailsIncome' : 'DetailsExpense'}`}
              label="Your Details"
              rules={[
                {
                  required: true,
                  message: 'Please input your details!',
                },
              ]}
            >
              <div className='flex items-center gap-4'>
                <Input
                  style={{ color: '#FFF' }}
                  className='w-full rounded-full p-2 bg-slate-800 text-sm font-bold' placeholder="xxxxxx"
                />

              </div>
            </Form.Item>
            <Form.Item
              name={`${choice == 1 ? 'Income' : 'Expense'}`}
              label={`${choice == 1 ? 'Your Income' : 'Your Expense'}`}
              rules={[
                {
                  required: true,
                  message: 'Please input your Income!',
                },
              ]}
            >
              <div className='flex items-center gap-4'>
                <Input
                  type='number'
                  min={1}
                  style={{ color: '#FFF' }}
                  className='inputNumber w-full text-[#eb5353] rounded-full p-2 bg-slate-800  text-sm font-bold' placeholder="xxxxxx"
                />
              </div>
            </Form.Item>
            <div className='w-full flex justify-center items-center'>
              <Button htmlType="submit"
                className=' cursor-pointer rounded-full bg-cyan-950 text-sm text-[#FFFFFF] text-center'
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <div className='w-full min-h-[50%] flex flex-col  bg-[#ffffff] rounded-t-xl mt-8 p-8 '>
        <div className='text-[#000000] font-bold text-4xl text-start'>Your Total Balance</div>
        <div className='w-full flex justify-center my-8'>
          <div className='w-full bg-slate-400 flex flex-col items-center justify-center p-4 gap-4 border rounded-xl'>
            <div className='text-[#FFFFFF] font-bold text-xl' >ยอดคงเหลือทั้งหมดของคุณ</div>
            <div className='text-[#d8f1d6] font-bold text-2xl'>฿ {numberFormat(dataStore.totalBalance)}</div>
          </div>
        </div>

        <div className='text-[#000000] font-bold text-2xl text-start mb-8'>YOUR WALLET STORY</div>
        {dataStore.balanceDetail.length != 0 ?
          <WalletList
            balanceDetail={dataStore.balanceDetail}
          // deleteEntry={deleteEntry}ss
          />
          :
          <Empty className='my-10 text-[#000]'  />
        }


      </div>
    </div>
  ))
}

export default index
