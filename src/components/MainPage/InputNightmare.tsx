import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputNightmare: React.FC = () => {
  const [description, setDescription] = useState('');
  const [ending_category, setEnding_category] = useState('0');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    console.log('Token:', token);

    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/nightmares/modify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ description, ending_category: ending_category }),
    });

    if (!response.ok) {
      console.error('Error:', response.statusText);
      return;
    }

    const data = await response.json();
    console.log(data);

    // 改変結果を表示する画面に遷移する処理を追加
    navigate('/modified-nightmare', { state: { 
      modified_description: data.modified_description, 
      description: description,
      ending_category: ending_category 
    } });    
  };

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <form className="bg-pink-100 shadow-lg p-6 rounded-lg w-[95%] mx-auto border border-gray-300" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">悪夢を入力してください</h1>
        <div className="mb-4">
          <label className="block mb-2">悪夢内容：</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">結末：</label>
          <div>
            <label>
              <input
                type="radio"
                value="0"
                checked={ending_category === '0'}
                onChange={(e) => setEnding_category(e.target.value)}
              />
              ハッピーエンド
            </label>
            <label className="ml-4">
              <input
                type="radio"
                value="1"
                checked={ending_category === '1'}
                onChange={(e) => setEnding_category(e.target.value)}
              />
              予想外の結末
            </label>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          改変する
        </button>
      </form>
    </div>
  );
};

export default InputNightmare;
