import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from 'utils/api';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import Button from 'components/CustomButtons/Button';
import { useHistory } from 'react-router-dom';

const ReviewCmp = ({ comment, date, star }) => {
    
    return (
        <StyledCommentContainer>
            <StyledFlexRow>
                <div>
                    {comment}
                </div>
                <div>
                    {/* <div>{date}</div> */}
                    <div>
                        <StarRatings
                            rating={star}
                            starRatedColor="#ffcd3c"
                            // changeRating={setStar}
                            starEmptyColor="#ddd"
                            // starHoverColor="#ffcd3c"
                            numberOfStars={5}
                            name='rating'
                            starDimension="25"
                        />
                    </div>
                    {/* <div>{star}</div> */}
                </div>
            </StyledFlexRow>
        </StyledCommentContainer>
    );
};

const DoctorProfile = () => {
    const { id } = useParams();
    const [ docData, setDocData ] = useState();
    const hist = useHistory();

    const fetchDocData = async () => {
        const data = await api.getUserById(id);
        setDocData(data);
        console.log(data);
    };

    useEffect(() => {
        fetchDocData();
    }, []);

    return (
        <div>
            {docData && (<div>
                <StyledFlexRow>
                    <div>
                        <h1 style={marginSetter}>{docData.name}</h1>
                        <h3 style={marginSetter}>{docData.specialization}</h3>
                    </div>
                    <StyledRightContainer>
                        <img src={`http://localhost:5000${docData.image}`} alt="..."  width={150}/>
                        <h6 style={marginSetter}>{docData.about}</h6>
                        <Button color="primary" onClick={() => {
                            hist.push(`/user/bookAppointment/${id}`);
                            window.location.reload();
                        }}>Book an Appointment @{docData.charge}</Button>
                    </StyledRightContainer>
                </StyledFlexRow>
                {docData.reviews.map(elem => (
                    <div>
                        <ReviewCmp comment={elem.comment} date={elem.date} star={elem.rating}/>
                    </div>
                ))}
            </div>)}
        </div>
    );
};

export default DoctorProfile;

const StyledFlexRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: auto 24px;
`;

const marginSetter = {
    margin: "12px auto",
};

const StyledCommentContainer = styled.div`
    border-bottom: 2px solid #ddd;
    padding: 12px;
    /* padding-bottom: 12px; */
`;

const StyledRightContainer = styled.div`
    text-align: right;
`;