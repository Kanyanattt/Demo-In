import React, { useState, useEffect } from 'react'; 
import { useObserver } from 'mobx-react-lite';
import { numberFormat } from '../Util';
import { useStore } from '../stores';
import { Input, Form, Button } from 'antd';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const WalletList = ({ balanceDetail }) => { 
    const [form] = Form.useForm();
    const { dataStore } = useStore();
    const [editedItem, setEditedItem] = useState(null); 
    const [iseditedItem, setIsEditedItem] = useState(false);

    useEffect(() => { 
        if (editedItem) {
            form.setFieldsValue({
                [editedItem.id]: editedItem.id,
                [editedItem.StatusIncome ? 'DetailsIncome' : 'DetailsExpense']: editedItem.DetailsIncome || editedItem.DetailsExpense,
                [editedItem.StatusExpense ? 'Expense' : 'Income']: editedItem.Expense || editedItem.Income,
            });
        }
    }, [editedItem]);

    const deleteEntry = async (id) => {
        await dataStore.deleteItem(id);
    };

    const onUpdate = (item) => { 
        setEditedItem(item);
        setIsEditedItem(true)
    };

    const onFinish = async (values, item) => {
        const newEntry = {
            id: item.id, 
            StatusIncome: item.StatusIncome ? item.StatusIncome : undefined,
            StatusExpense: item.StatusExpense ? item.StatusExpense : undefined,
            ...values, 
            time: moment().format('dddd MM/YYYY HH:mm') 
        };
        // console.log(newEntry);
        await dataStore.updateItem(newEntry); 
        setIsEditedItem(false)
        form.resetFields();
    };


    return useObserver(() => (
        <div className='w-full flex flex-col gap-4'>
            {balanceDetail.map((item, ind) =>
                <div key={item.id} className='w-full flex  lg:flex-row flex-col justify-center  gap-2'>
                    <div className='border md:w-[90%] w-full rounded-xl'>
                        <div className=' flex lg:flex-row flex-col lg:justify-start justify-center  gap-4 p-4 items-center '>
                            <div className='w-[20%]   flex items-center gap-3'>
                                {item.StatusIncome ?
                                    <img className=' w-8 h-8' src='../emojione_money-bag.png' />
                                    :
                                    <img className=' w-8 h-8' src='../expenses.png' />
                                }
                                <div className={`text-lg ${item.StatusIncome ? 'text-lime-600' : ' text-red-600'} `}>{item.StatusExpense ? 'Expense' : 'Income'}</div>
                            </div>
                            <div className='w-[80%]  flex lg:flex-row flex-col lg:justify-between justify-center items-center'>
                                <div className=' text-lg text-[#000]'>{item.time}</div>
                                <div className='  flex flex-col justify-center items-end'>
                                    {iseditedItem &&  editedItem.id === item.id  ? (
                                        <Form
                                            form={form}
                                            className='w-fit flex flex-col items-center justify-center'
                                            onFinish={(value) => onFinish(value, item)}
                                            initialValues={{
                                                id: item.id,
                                                DetailsIncome: item.DetailsIncome || '',
                                                DetailsExpense: item.DetailsExpense || '',
                                                Income: item.Income || '',
                                                Expense: item.Expense || ''
                                            }}
                                        >
                                            <Form.Item
                                                name={`${item.StatusIncome ? 'DetailsIncome' : 'DetailsExpense'}`}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your details!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    style={{ color: '#FFF' }}
                                                    className='w-full rounded-full p-2 bg-slate-800 text-sm font-bold'
                                                    placeholder="Details"
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name={`${item.StatusExpense ? 'Expense' : 'Income'}`}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your Income!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    type='number'
                                                    min={1}
                                                    style={{ color: '#FFF' }}
                                                    className='inputNumber w-full text-[#eb5353] rounded-full p-2 bg-slate-800  text-sm font-bold'
                                                    placeholder="Amount"
                                                />
                                            </Form.Item>
                                            {iseditedItem &&  editedItem.id === item.id &&
                                                <div className='w-full flex justify-center items-center'>
                                                    <Button htmlType="submit"
                                                        className=' cursor-pointer rounded-full bg-cyan-950 text-sm text-[#FFFFFF] text-center'
                                                    >
                                                        SAVE
                                                    </Button>
                                                </div>
                                            }
                                        </Form>
                                    ) : (
                                        <>
                                            <div className=' text-lg text-[#000] font-bold '>{item.DetailsIncome || item.DetailsExpense}</div>
                                            <div className={`text-lg font-bold ${item.StatusIncome ? 'text-lime-600' : ' text-red-600'} `}>฿ {item.StatusIncome ? numberFormat(item.Income) : numberFormat(item.Expense)}</div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-[10%] w-full flex items-center justify-center gap-3 '>
                        <div onClick={() => deleteEntry(item.id)}>
                            <img className='w-8 h-8' src='../iconoir_trash.png' />
                        </div>
                        <div className=''>
                            {iseditedItem  &&  editedItem.id === item.id  ? (
                                // <img onClick={() => onFinish()} className='w-8 h-8' src='../icon-park_correct.png' />
                                null
                            ) : (
                                <img onClick={() => onUpdate(item)} className='w-8 h-8' src='../uil_edit.png' />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    ));
};

export default WalletList;