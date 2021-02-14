import React, { useEffect, useState } from "react";
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

const MoviesUpdate = ({ match }) => {
  console.log(match);
  const [id, setId] = useState(match.params.id);
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

  const handleUpdateMovie = async () => {
    const arrayTime = time.split("/");
    const payload = { name, rating, time: arrayTime };
    await api.updateMovie(id, payload).then((res) => {
      window.alert("영화 정보가 수정되었습니다.");
      setName("");
      setRating("");
      setTime("");
    });
  };

  useEffect(() => {
    const getMovie = async () => {
      const movie = await api.getMovie(id);
      setName(movie.data.data.name);
      setRating(movie.data.data.rating);
      // join 메서드 = 배열의 모든 요소를 연결해 한 문자열로 만듬.
      setTime(movie.data.data.time.join("/"));
    };
    return () => {
      getMovie();
    };
  }, []);

  return (
    <Wrapper>
      <Title>영화 정보 수정</Title>
      <Label>제목 : </Label>
      <InputText
        type="text"
        value={name}
        onChange={handleChangeInputName}
      ></InputText>
      <Label>평점 : </Label>
      <InputText
        type="number"
        step="0.1"
        lang="ko-KR"
        min="0"
        max="10"
        // 그런데 input 태그의 속성으로 이런 것도 있나?
        pattern="[0-9]+([,\.][0-9]+)?"
        value={rating}
        onChange={handleChangeInputRating}
      ></InputText>
      <Label>상영시간 : </Label>
      <InputText
        type="text"
        value={time}
        onChange={handleChangeInputTime}
      ></InputText>
      <Button onClick={handleUpdateMovie}>정보 업데이트</Button>
      {/* 버튼의 href 속성을 사용해 a 태그처럼 사용할 수 있다! */}
      <CancelButton href={"/movies/list"}>취소</CancelButton>
    </Wrapper>
  );
};

export default MoviesUpdate;
