import {Avatar, Box, Card, Paper, Stack, styled, Typography, CircularProgress} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";
import healingFarmImage from "../assets/ChatGPT Image 2025년 5월 9일 오후 10_58_08 1.png";
import img from "../assets/img.png";
import {SERVER_URL} from "../common/region.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";

// 스타일링된 Paper 컴포넌트
const StyledPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
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

export const ExpertCard = ({name, title, image}: expert) => (
    <Card sx={{minWidth: 200, maxWidth: 280, mx: 1, border: 0.5}} elevation={2}>
        <Box sx={{p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Avatar
                variant={"rounded"}
                src={`${SERVER_URL}${image}`}
                alt={name}
                sx={{width: 120, height: 120, mb: 2}}
            />
            <Typography variant="h6" component="div" sx={{fontWeight: 'bold'}}>
                {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {title}
            </Typography>
        </Box>
    </Card>
);

const MainPage = () => {
    // 전문가 데이터 상태 관리
    const [experts, setExperts] = useState<expert[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    // useEffect를 사용하여 전문가 데이터 가져오기 (axios 활용)
    useEffect(() => {
        const fetchExperts = async () => {
            try {
                setLoading(true);
                // API 엔드포인트는 실제 환경에 맞게 수정해주세요
                const response = await axios.post<expert[]>(`${SERVER_URL}/expert/main/search`);
                console.log(response.data);
                setExperts(response.data);
                setError(null);
            } catch (err) {
                console.error('전문가 데이터 로딩 오류:', err);
                setError('전문가 데이터를 불러오는 중 오류가 발생했습니다.');
                // 오류 발생 시 샘플 데이터 사용 (expert 타입에 맞게 조정)
                setExperts([
                    {
                        id: 1,
                        name: "김농장",
                        title: "유기농 전문가",
                        image: "",
                        job: "",
                        career: "",
                        region: "",
                        price: 0,
                        introduction: "",
                        phone: ""
                    },
                    {
                        id: 2,
                        name: "이컨설턴트",
                        title: "농장 설계 전문가",
                        image: "",
                        job: "",
                        career: "",
                        region: "",
                        price: 0,
                        introduction: "",
                        phone: ""
                    },
                    {
                        id: 3,
                        name: "박농업",
                        title: "치유농업 전문가",
                        image: "",
                        job: "",
                        career: "",
                        region: "",
                        price: 0,
                        introduction: "",
                        phone: ""
                    },
                    {
                        id: 4,
                        name: "정원예",
                        title: "원예 치료사",
                        image: "",
                        job: "",
                        career: "",
                        region: "",
                        price: 0,
                        introduction: "",
                        phone: ""
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchExperts();
    }, []);  // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행

    return (
        <Stack
            direction="column"
            sx={{
                height: '100%',
                overflow: 'hidden',
                p: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            spacing={2}
        >
            {/* 상단 섹션 */}
            <Stack
                sx={{
                    width: '100%',
                    maxWidth: '1000px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                }}
            >
                <Box
                    sx={{
                        bgcolor: 'white',
                        borderRadius: '16px',
                        p: 3,
                        position: 'relative',
                        width: '100%',
                    }}
                >
                    {/* 이미지 그룹 - 우측에 배치 */}
                    <Box sx={{
                        position: 'absolute',
                        right: 24,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '176px',
                        height: '176px'
                    }}>
                        {/* 화분 이미지 */}
                        <Box sx={{position: 'absolute', bottom: 0, left: 0}}>
                            <img
                                src={healingFarmImage}
                                alt="식물 화분"
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    objectFit: 'contain'
                                }}
                            />
                        </Box>

                        {/* 메시지 말풍선 그룹 */}
                        <Box sx={{position: 'absolute', right: 0, top: 0}}>
                            <img
                                src={img}
                                alt="채팅 아이콘"
                                style={{
                                    width: '144px',
                                    height: '128px',
                                    objectFit: 'contain'
                                }}
                            />
                        </Box>
                    </Box>

                    {/* 컨텐츠 */}
                    <Box sx={{
                        textAlign: 'left',
                        mb: 3,
                        pr: '160px',
                    }}>
                        <Typography variant="h4" fontWeight="bold" sx={{mb: 1}}>
                            <span style={{display: 'block'}}>투명하고 빠르게 만나는</span>
                            <span>내 <span style={{color: '#3AB549'}}>치유 농장</span> 컨설턴트</span>
                        </Typography>

                        <Typography variant="body1" color="text.secondary" sx={{mt: 2, mb: 4}}>
                            치유농장 시설의 전문가 매칭 서비스
                        </Typography>

                        <Box
                            onClick={() => navigate('/selectRegion')}
                            sx={{
                                width: '100%',
                                background: 'linear-gradient(to right, #CEFCCB, #3AB549)',
                                borderRadius: '24px',
                                py: 1.5,
                                px: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                '&:hover': {
                                    background: 'linear-gradient(to right, #b9f7b8, #2e9e3c)'
                                }
                            }}
                        >
                            <SearchIcon sx={{mr: 1}}/>
                            AI 맞춤 전문가 찾기
                        </Box>
                    </Box>
                </Box>
            </Stack>

            {/* 하단 섹션 */}
            <StyledPaper sx={{flex: 1, width: '80%'}} elevation={0}>
                <Stack spacing={3} sx={{width: '100%'}}>
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                        이런 전문가들이 있어요!
                    </Typography>

                    {/* 로딩 상태 및 오류 표시 */}
                    {loading ? (
                        <Box sx={{display: 'flex', justifyContent: 'center', p: 3}}>
                            <CircularProgress/>
                        </Box>
                    ) : error ? (
                        <Typography color="error" sx={{textAlign: 'center'}}>
                            {error}
                        </Typography>
                    ) : (
                        /* 카드 슬라이드 영역 */
                        <Box sx={{overflow: 'auto', width: '100%'}}>
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    py: 2,
                                    minWidth: 'max-content'
                                }}
                            >
                                {experts.map(expert => (
                                    <ExpertCard
                                        key={expert.id}
                                        {...expert}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    )}
                </Stack>
            </StyledPaper>
        </Stack>
    );
}

export default MainPage;