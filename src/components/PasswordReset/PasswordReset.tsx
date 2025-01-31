import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import { ZxcvbnResult } from '@zxcvbn-ts/core/src/types'
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnJaPackage from '@zxcvbn-ts/language-ja'

const PasswordReset: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const email = query.get('email') || '';
  const token = query.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [result, setResult] = useState<ZxcvbnResult | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      alert('パスワードが一致しません。');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v1/password_resets/${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password_reset: { password: newPassword, password_confirmation: confirmPassword } }),
      });

      if (response.ok) {
        alert('パスワードを変更しました');
        navigate('/login');
      } else {
        alert('パスワードのリセットに失敗しました');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('パスワードのリセット中にエラーが発生しました');
    }
  };

  // zxcvbnの設定
  const options = {
    translations: zxcvbnJaPackage.translations,
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
      ...zxcvbnJaPackage.dictionary,
    },
  }
  zxcvbnOptions.setOptions(options)

  useEffect(() => {
    // パスワードがない場合はzxcvbnの結果をリセットする
    if (!newPassword) {
      setResult(undefined);
      return;
    }
    // 入力されたパスワードを用いてzxcvbnの結果を取得、useStateに格納する
    const newResult = zxcvbn(newPassword);
    setResult(newResult);
  }, [newPassword]);

  const getBarColor = (v: number, score: number) => {
    if (v <= score) {
      switch (score) {
        case 0:
          return 'bg-red-500';
        case 1:
          return 'bg-orange-500';
        case 2:
          return 'bg-yellow-500';
        case 3:
          return 'bg-green-500';
        case 4:
          return 'bg-blue-500';
        default:
          return 'bg-gray-500';
      }
    }
    return 'bg-gray-300';
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300 w-full max-w-md">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-KaiseiOpti text-center mb-4">パスワードリセット</h1>
        <p className="text-lg mb-4">メールアドレス: {email}</p>
        <div className="mb-4 relative">
          <label className="block text-lg font-KaiseiOpti mb-2">新しいパスワード</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-50 hover:opacity-100"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <div className="mt-[20px]">
            <div className="flex w-full gap-[1%]">
              {/* 強度を表す5段階のバーを表示 */}
              {[0, 1, 2, 3, 4].map((v) => (
                <div
                  className={`h-[4px] w-[24%] ${result ? getBarColor(v, result.score) : 'bg-gray-300'}`}
                  key={v}
                />
              ))}
            </div>
            {result && result.score + 1}
          </div>
          {/* feedback.warning がある場合は表示 */}
          {result?.feedback && <div className="text-[#f00]">{result.feedback.warning}</div>}
        </div>
        <div className="mb-4 relative">
          <label className="block text-lg font-KaiseiOpti mb-2">新しいパスワード（確認用）</label>
          <div className="relative">
            <input
              type={showPasswordConfirmation ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            <span
              onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-50 hover:opacity-100"
            >
              <FontAwesomeIcon icon={showPasswordConfirmation ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-KosugiMaru px-4 py-2 rounded"
          >
            更新
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
