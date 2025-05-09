import {Box, Card, CircularProgress, Paper, Stack, styled, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {SERVER_URL} from "../common/region.ts";
import useSelectedStore from "../store/useSelectedStore";

// 스타일링된 Paper 컴포넌트
const StyledPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

type expert = {
    id: number,
    image: string,
    job: string,
    career: string,
    region: string,
    title: string,
    price: number,
    introduction: string,
    name: string,
    phone: string
}

const ExpertCard = ({name, title, image, job, career, introduction}: expert) => (
    <Card sx={{width: '100%', minWidth: 280, maxWidth: 320, mx: 1, border: 0.5, height: '100%'}} elevation={2}>
        <Box sx={{p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Box
                component="img"
                src={`${SERVER_URL}${image}`}
                alt={name}
                sx={{
                    width: 120,
                    height: 120,
                    mb: 1,
                    borderRadius: 1,
                    objectFit: 'cover'
                }}
            />
            <Typography variant="h6" component="div" sx={{fontWeight: 'bold', mt: 0.5}}>
                {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                직업: {job}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                경력: {career}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{mt: 1, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
                {introduction}
            </Typography>
        </Box>
    </Card>
);

const ExpertRecommend = () => {
    const [experts, setExperts] = useState<expert[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Zustand 스토어에서 선택한 데이터 가져오기
    const {
        selectedRegion,
        selectedSubArea,
        selectedProgramTarget,
        selectedProgramType,
        selectedInstitution,
        selectedConsulting
    } = useSelectedStore();

    useEffect(() => {
        const fetchRecommendedExperts = async () => {
            try {
                setLoading(true);
                // 선택한 데이터로 요청 파라미터 생성
                const requestData = {
                    region: selectedRegion + ' '+ selectedSubArea,
                    target: selectedProgramTarget,
                    category: selectedProgramType,
                    facilities: selectedInstitution,
                    offline: selectedConsulting
                };

                // API 요청하기
                const response = await axios.post<expert[]>(`${SERVER_URL}/expert/search/21`, requestData);
                console.log('추천 전문가 데이터:', response.data);

                // 최대 4개의 전문가만 표시
                // const limitedExperts = response.data.slice(0, 4);
                setExperts(response.data);
                setError(null);
            } catch (err) {
                console.error('전문가 추천 데이터 로딩 오류:', err);
                setError('추천 전문가 데이터를 불러오는 중 오류가 발생했습니다.');
                // 오류 발생 시 샘플 데이터 사용
                setExperts([
                    {id: 1, name: "김농장", title: "유기농 전문가", image: "", job: "농장 컨설턴트", career: "10년", region: "서울", price: 50000, introduction: "유기농 작물 재배 및 치유농업 전문가입니다.", phone: "010-0000-0000"},
                    {id: 2, name: "이컨설턴트", title: "농장 설계 전문가", image: "", job: "농업 건축가", career: "15년", region: "경기", price: 70000, introduction: "치유농장 시설 설계 및 구축 전문가입니다.", phone: "010-0000-0000"},
                    {id: 3, name: "박농업", title: "치유농업 전문가", image: "", job: "치유농업 강사", career: "7년", region: "인천", price: 60000, introduction: "다양한 치유 프로그램 개발 및 운영 경험이 있습니다.", phone: "010-0000-0000"},
                    {id: 4, name: "정원예", title: "원예 치료사", image: "", job: "원예 치료사", career: "12년", region: "강원", price: 55000, introduction: "식물을 통한 정서 치료 프로그램을 운영합니다.", phone: "010-0000-0000"}
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendedExperts();
    }, [selectedRegion, selectedProgramTarget, selectedProgramType, selectedInstitution, selectedConsulting]);

    return (
        <Box sx={{ width: '80%', margin: '40px auto' }}>
            <Typography variant="h5" component="h2" gutterBottom>
                결과가 나왔어요!
            </Typography>
            <Typography variant="h4" component="h3" gutterBottom sx={{ mb: 4 }}>
                나에게 맞는 전문가는..
            </Typography>

            {/* 중간 섹션 - 추천 전문가 카드 */}
            <StyledPaper sx={{ mb: 4 }} elevation={0}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color="error" sx={{ textAlign: 'center' }}>
                        {error}
                    </Typography>
                ) : (
                    <Stack spacing={3} sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
                            {experts.map(expert => (
                                <Box key={expert.id} sx={{ width: '22%', minWidth: 280 }}>
                                    <ExpertCard {...expert} />
                                </Box>
                            ))}
                        </Box>
                    </Stack>
                )}
            </StyledPaper>
        </Box>
    );
};

export default ExpertRecommend;