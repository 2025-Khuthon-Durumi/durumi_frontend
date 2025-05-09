import {Divider, Alert, Box, Button, CircularProgress, Container, Grid, Paper, styled, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import useSelectedStore from "../store/useSelectedStore";
import type {expert} from "./ExpertRecommend.tsx";
import axios from "axios";
import {SERVER_URL} from "../common/region.ts";

// 상단 배경색을 위한 styled 컴포넌트
const HeaderBox = styled(Box)(({theme}) => ({
    backgroundColor: '#e8f5e9', // 연한 녹색 배경색 (예시)
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
}));

// 정보 카드 스타일
const InfoCard = styled(Paper)(({theme}) => ({
    padding: theme.spacing(3),
    // boxSizing: 'border-box', // 패딩이 너비에 포함되도록 설정 (필요시)
}));

const ExpertDetail = () => {
    const {selectedExpertId} = useSelectedStore();
    const [expertData, setExpertData] = useState<expert | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExpertDetails = async () => {
            if (!selectedExpertId) {
                setError("전문가 ID가 선택되지 않았습니다");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get<expert>(`${SERVER_URL}/expert/get/${selectedExpertId}`);
                setExpertData(response.data);
                setError(null);
                console.log(response.data);
            } catch (error) {
                console.error('전문가 상세 정보 로딩 오류:', error);
                setError('전문가 정보를 불러오는데 실패했습니다');
            } finally {
                setLoading(false);
            }
        };

        fetchExpertDetails();
    }, [selectedExpertId]);

    if (loading) {
        return (
            <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
                <CircularProgress/>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{mt: 4}}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <>
            {/* HeaderBox를 Container 바깥으로 이동하고 width: '100%' 설정 */}
            <HeaderBox sx={{width: '100%', marginLeft: 0, marginRight: 0}}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center" justifyContent="space-between">
                        <Grid item xs={12} md={7}>
                            <Typography variant="h3" gutterBottom sx={{fontWeight: 'bold'}}>
                                {expertData?.name || "이름 없음"} 전문가
                            </Typography>
                            <Box sx={{display: 'flex', gap: 4, mt: 5}}>
                                <Typography variant="body1" sx={{fontWeight: 'bold'}}>
                                    경력: {expertData?.career || "정보 없음"}
                                </Typography>

                                <Divider orientation="vertical" variant="middle" flexItem/>

                                <Typography variant="body1" sx={{fontWeight: 'bold'}}>
                                    지역: {expertData?.region || "정보 없음"}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={5} sx={{justifyContent: 'flex-end'}}>
                            {expertData?.image ? (
                                <Box
                                    component="img"
                                    src={`${SERVER_URL}${expertData.image}`}
                                    alt={expertData.name}
                                    sx={{
                                        width: '100%',
                                        maxWidth: '350px',
                                        height: 290,
                                        objectFit: 'cover',
                                        ml: 'auto',
                                    }}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        width: '100%',
                                        maxWidth: '300px',
                                        height: 200,
                                        backgroundColor: '#d5d5d5',
                                        ml: 'auto',
                                    }}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </HeaderBox>

            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between">
                    <Grid item xs={12} md={7}>
                        <Typography variant="h6" gutterBottom
                                    sx={{borderBottom: '2px solid #4caf50', display: 'inline-block', paddingBottom: 1}}>
                            소개
                        </Typography>
                        <Box sx={{mt: 2}}>
                            <Typography variant="body1">
                                {expertData?.introduction || "서비스 설명이 없습니다."}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={5} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <InfoCard elevation={3} sx={{width: '100%', maxWidth: '350px'}}>
                            <div>
                                <Typography variant="h6" gutterBottom>
                                    {expertData?.name || "이름 없음"} 전문가
                                    <span style={{fontSize: '0.8em', color: '#4caf50', marginLeft: 8}}>
                                    {expertData?.career || "정보 없음"}
                                </span>
                                </Typography>
                                <Box sx={{my: 3}}>
                                    <Typography variant="body2">
                                        {expertData?.title || "직함 정보 없음"}
                                    </Typography>
                                    <Typography variant="body2">
                                        {expertData?.job || "직업 정보 없음"}
                                    </Typography>
                                    <Typography variant="body2">
                                        연락처: {expertData?.phone || "연락처 정보 없음"}
                                    </Typography>
                                </Box>
                            </div>

                            <div>
                                <Typography variant="h5" align="right" sx={{my: 3}}>
                                    {expertData?.price?.toLocaleString() || "0"} 원
                                </Typography>

                                <Button variant="contained" fullWidth
                                        sx={{backgroundColor: '#4caf50', '&:hover': {backgroundColor: '#388e3c'}}}>
                                    문의하기
                                </Button>
                            </div>
                        </InfoCard>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
export default ExpertDetail