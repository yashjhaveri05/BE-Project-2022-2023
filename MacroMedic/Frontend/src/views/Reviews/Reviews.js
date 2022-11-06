import React, { useState, useEffect, useContext } from "react";

import CustomInput from 'components/CustomInput/CustomInput';
import Button from 'components/CustomButtons/Button';
import styled from "styled-components";
import { Star, StarOutlined, StarBorder } from '@material-ui/icons';
import StarRatings from 'react-star-ratings';
// import Rating from 'react-simple-star-rating';
import api from 'utils/api';
import { useHistory } from 'react-router-dom';
import {GlobalContext} from '../../GlobalContext';

const Reviews = () => {
    const history = useHistory();

    const [ review, setReview ] = useState("");
    const [ star, setStar ] = useState(0);

    const { user } = useContext(GlobalContext);
    const [userData, setUserData] = user;

    if(userData.role === 'doctor'){
        history.push('/user/dashboard'); 
    }

    const setStarFunc = (rate) => {
        setStar(rate);
    };

    useEffect(() => {
        console.log(star);
    }, [star]);

    const _id = JSON.parse(localStorage.getItem("review_docID"));
    const _id_patient = JSON.parse(localStorage.getItem("review_patientID"));
    console.log(_id, _id_patient);

    const onSubmitHandler = async () => {
        // const rating = await api.fetchRating(review);
        // console.log('Frontend = ', rating);
        // const data = await api.addReview(_id, rating, review, _id_patient);
        // console.log(data);
        history.push('/user/dashboard');
    };

    return(
        <StyledCenterDiv>
            {/* {_id && (<div style={{ textAlign: 'left', marginLeft: '18px' }}>
                <p>Doctor Name: {_id}</p>
            </div>)} */}
            <div>
                <h4>This is after meeting page. Currently it does nothing</h4>
            </div>
            <div>
                <StyledInputContainer>
                    {/* <CustomInput
                        labelText="Review"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        // value={users.name ? users.name : ""}
                        // defaultValue={users && users.name}
                        // onChange={(e) =>
                        //   setUsers({ ...users, name: e.target.value })
                        // }
                        onChange={(e) => {
                            setReview(e.target.value);
                        }}
                    /> */}
                </StyledInputContainer>
                {/* <StarRatingContainer>
                    <StarRatings
                        rating={star}
                        starRatedColor="#ffcd3c"
                        changeRating={setStar}
                        starEmptyColor="#ddd"
                        starHoverColor="#ffcd3c"
                        numberOfStars={5}
                        name='rating'
                        />
                </StarRatingContainer> */}
                <Button color="info" onClick={onSubmitHandler}>Submit</Button>
            </div>
        </StyledCenterDiv>
    );
};

export default Reviews;

const StyledCenterDiv = styled.div`
    text-align: center;
    margin: auto;
`;

const StyledInputContainer = styled.div`
    width: 75%;
    margin: auto;
`;

const StyledStarBorder = styled(StarBorder)`
    :hover{
        color: #ffcd3c;
    }
`;

const StarRatingContainer = styled.div`
    margin: 24px auto;
`;