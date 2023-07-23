import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

interface DataType {
  title: string;
  content: string;
  like_count: number;
  img: string;
}

export const addDataToDB = async (data: DataType[]) => {
  try {
    for (const item of data) {
      await prisma.articles.create({
        data: {
          title: item.title,
          content: item.content,
          like_count: item.like_count,
          img: item.img,
        },
      });
    }
    const result = '완료';
    return result;
  } catch (err) {
    console.error('API요청오류: ', err);
  }
};

type Data = {
  items?: any;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { data } = req.body;
  if (!data) {
    res.status(400).json({ message: 'Empty Contents' });
    return;
  }
  try {
    const response: string | any = await addDataToDB(data);
    res.status(200).json({ message: response });
  } catch (err) {
    res.status(400).json({ message: 'Fail' });
  }
};

export default handler;
