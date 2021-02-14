import React, { useState } from "react";
import styled from "styled-components";
import api from "../api/api";

const Title = styled.h1.attrs({
  className: "h1",
})``;

const Wrapper = styled.div.attrs({
  className: "form-group",
})`
  margin: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  className: "form-control",
})`
  margin: 5px;
`;

const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`;

const MoviesInsert = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [time, setTime] = useState("");

  const handleChangeInputName = (e) => {
    setName(e.target.value);
  };

  const handleChangeInputRating = (e) => {
    const rating = e.target.validity.valid ? e.target.value : rating;
    setRating(rating);
  };

  const handleChangeInputTime = (e) => {
    setTime(e.target.value);
  };

  const handleIncludeMovie = async () => {
    const arrayTime = time.split("/");
    const payload = { name, rating, time: arrayTime };
    await api.insertMovie(payload).then((res) => {
      window.alert(`영화 정보가 추가되었습니다.`);
      setName("");
      setTime("");
      setRating("");
    });
  };

  return (
    <Wrapper>
      <Title>영화 데이터 추가</Title>
      <Label>제목 : </Label>
      <InputText
        type="text"
        value={name}
        onChange={handleChangeInputName}
      ></InputText>
      <Label>평점 : </Label>
      {/* input 태그의 속성에 대해 한번 정리하기 */}
      <InputText
        type="number"
        step="0.1"
        lang="ko-KR"
        min="0"
        max="10"
        // 정규 표현식도 한번 정리하기...
        pattern="[0-9]+([,\.][0-9]+)?"
        value={rating}
        onChange={handleChangeInputRating}
      ></InputText>
      <Label>상영시간 : </Label>
      {/* input 태그의 속성에 대해 한번 정리하기 */}
      <InputText
        type="text"
        value={time}
        onChange={handleChangeInputTime}
      ></InputText>
      <Button onClick={handleIncludeMovie}>정보 추가</Button>
      <CancelButton href={"/movies/list"}>취소</CancelButton>
    </Wrapper>
  );
};

export default MoviesInsert;
