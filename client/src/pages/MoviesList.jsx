import React, { useEffect, useState, useMemo } from "react";
import Table from "../components/Table";
import api from "../api/api";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;

const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
`;

const UpdateMovie = ({ id }) => {
  const updateUser = (e) => {
    e.preventDefault();
    window.location.href = `/movies/update/${id}`;
  };

  return <Update onClick={(e) => updateUser(e)}>Update</Update>;
};

const DeleteMovie = ({ id }) => {
  const deleteUser = (e) => {
    e.preventDefault();
    if (window.confirm(`Do you want to delete the movie ${id} permanently?`)) {
      api.deleteMovie(id);
      window.location.reload();
    }
  };

  return <Delete onClick={(e) => deleteUser(e)}>Delete</Delete>;
};

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [columns, setColumns] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      await api.getAllMovies().then((movieList) => {
        setMovies(movieList.data.data);
        setLoading(false);
      });
    };
    return getMovies();
  }, []);

  let showTable = true;
  if (!movies.length) {
    showTable = false;
  }

  return (
    <Wrapper>
      {showTable && (
        <Table
          data={movies}
          DeleteMovie={DeleteMovie}
          UpdateMovie={UpdateMovie}
        />
      )}
    </Wrapper>
  );
};

export default MoviesList;
