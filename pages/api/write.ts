import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export const createArticle = async (
  title: string,
  content: string,
  img: string,
) => {
  try {
    const response = await prisma.articles.create({
      data: {
        title,
        content,
        like_count: 0,
        img,
      },
    });
    return response;
  } catch (err) {
    console.error('API요청오류: ', err);
  }
};

type Data = {
  items?: any;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { title, content, img } = req.body;
  if (!title || !content || !img) {
    res.status(400).json({ message: 'Empty Contents' });
    return;
  }
  try {
    const response = await createArticle(title, content, img);
    res.status(200).json({ items: response, message: 'Success' });
  } catch (err) {
    res.status(400).json({ message: 'Fail' });
  }
};

export default handler;
