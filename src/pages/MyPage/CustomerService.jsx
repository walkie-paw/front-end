// 고객센터
// src/pages/CustomerService.jsx

import React, { useEffect, useState } from 'react';
// axios 임포트
import axios from "axios";
// 팝업창, 모달: sweetalert 적용
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// 아이콘: font-awesome 적용
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";


const MySwal = withReactContent(Swal);

const CustomerService = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/qna', {
        title,
        content,
        memberId: 1, // 멤버 ID를 적절히 설정하세요
      });

      if (response.status === 201) {
        MySwal.fire({
          title: "제출이 완료되었습니다",
          icon: "success",
          confirmButtonText: "확인",
        }).then(() => {
          setTitle("");
          setContent("");
        });
      }
    } catch (error) {
      MySwal.fire({
        title: "오류가 발생했습니다",
        text: "다시 시도해 주세요.",
        icon: "error",
        confirmButtonText: "확인",
      });
      console.error("There was an error adding the QnA!", error);
    }
  };


  return (
    <div className="max-h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">고객센터</h1>
      <h2 className="text-2xl font-bold mb-3">🔔 1:1 문의</h2>

      <div className="flex items-center mb-2">
        <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
        <h2 className="font-bold">온라인 보안 팁</h2>
      </div>
      <p className="mb-6">
        고객님의 보안 유지를 위해, 개인정보나 신용카드 정보를 전화, 이메일, 채팅
        등으로 공유하는 행위는 절대 삼가시기 바랍니다.
      </p>
      <h2 className="text-2xl font-bold mb-6">도움이 필요하신가요?</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="제목을 입력하세요"
            required
          />
        </div>
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="내용을 입력하세요"
            required
          />
        </div>
        <div className="text-right items-center justify-between">
          <button
            type="submit"
            className="bg-[#43312A] hover:bg-[#43312A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            전송
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerService;
