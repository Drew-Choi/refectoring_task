import ButtonCustom from '@/components/ButtonCustom';
import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Test = () => {
  const [data, setData] = useState<Array<any | null>>([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        const skip = 0;
        const take = 9;
        const response = await axios.get(
          `/api/library/content?skip=${skip}&take=${take}`,
        );

        if (response.status === 200) {
          setData(response.data.items);
        }
        return;
      } catch (err) {
        console.error(err);
      }
    };
    getAll();
  }, []);

  const addInfo = async (data: any[]) => {
    try {
      const response = await axios.post(`/api/add`, {
        data,
      });
      if (response.status === 200) {
        alert(response.data.message);
      }
      return;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      css={css`
        padding: 50px;
      `}
    >
      <ButtonCustom onClick={() => addInfo(data)}>자료추가하기</ButtonCustom>
    </div>
  );
};

export default Test;
