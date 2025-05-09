import {Box, Paper, Stack, Typography, Button} from "@mui/material";
import Theme from "../common/Theme.ts";
import {region} from "../common/region.ts";
import useSelectedStore from "../store/useSelectedStore";
import {useNavigate} from "react-router";
import SelectedInfo from "../component/SelectedInfo.tsx";

const SelectRegion = () => {
    const navigate = useNavigate();

    // Zustand 스토어에서 상태 및 업데이트 함수 가져오기
    const {
        selectedRegion,
        selectedSubArea,
        setSelectedRegion,
        setSelectedSubArea
    } = useSelectedStore();

    // 선택된 지역의 subArea 목록을 가져오는 함수
    const getSubAreas = () => {
        if (!selectedRegion) return [];
        const found = region.find(item => item.name === selectedRegion);
        return found ? found.subArea : [];
    };

    return (
        <Stack
            direction="column"
            sx={{
                height: '100vh',
                width: '100%',
            }}
        >
            {/* 상단 영역 (5) */}
            <Box sx={{height: 'calc(100vh - 150px)'}}>
                <Stack
                    direction="row"
                    sx={{
                        height: '100%',
                        width: '100%',
                    }}
                >
                    {/* 첫 번째 열 (3) */}
                    <Paper
                        sx={{
                            flex: 2,
                            p: 2,
                            m: 1,
                            backgroundColor: Theme.palette.primary[200],
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        elevation={1}
                    >
                        <Stack
                            direction="column"
                            spacing={3}
                            alignItems="center"
                            justifyContent="center"
                            sx={{width: '100%'}}
                        >
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{fontWeight: 'bold', color: '#3AB549'}}
                            >
                                맞춤 전문가 찾기
                            </Typography>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{fontWeight: 'bold', color: '#000000'}}
                            >
                                지역선택
                            </Typography>
                            <Typography
                                component="div"
                                sx={{color: '#B0B0B0'}}
                            >
                                어느 지역의 전문가를 찾으시나요?
                            </Typography>
                            <Typography
                                component="div"
                                sx={{color: '#B0B0B0'}}
                            >
                                지역을 선택하시면 그 지역의 전문가를 찾아드립니다.
                            </Typography>
                        </Stack>
                    </Paper>

                    {/* 두 번째 열 (2) - 지역 목록 */}
                    <Box
                        sx={{
                            flex: 2,
                            display: 'flex',
                            alignItems: 'flex-end',
                            m: 1,
                        }}
                    >
                        <Paper
                            sx={{
                                width: '100%',
                                p: 2,
                                backgroundColor: '#ffffff',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '80%',
                                overflow: 'hidden',
                            }}
                            elevation={1}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    mb: 2,
                                    color: Theme.palette.primary.main
                                }}
                            >
                                지역 선택
                            </Typography>
                            <Box sx={{
                                overflow: 'auto',
                                flex: 1,
                                '&::-webkit-scrollbar': {
                                    width: '6px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: Theme.palette.primary[200],
                                    borderRadius: '4px',
                                },
                            }}>
                                <Stack spacing={1.5}>
                                    {region.map((item, index) => (
                                        <Box
                                            key={index}
                                            onClick={() => setSelectedRegion(item.name)}
                                            sx={{
                                                p: 1.5,
                                                borderRadius: 1,
                                                cursor: 'pointer',
                                                backgroundColor: selectedRegion === item.name
                                                    ? Theme.palette.primary[200]
                                                    : 'transparent',
                                                borderLeft: selectedRegion === item.name
                                                    ? `4px solid ${Theme.palette.primary.main}`
                                                    : '4px solid transparent',
                                                transition: 'all 0.2s',
                                                '&:hover': {
                                                    backgroundColor: selectedRegion === item.name
                                                        ? Theme.palette.primary[200]
                                                        : Theme.palette.primary[100],
                                                }
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: selectedRegion === item.name ? 'bold' : 'normal',
                                                    color: selectedRegion === item.name ? Theme.palette.primary.main : 'inherit'
                                                }}
                                            >
                                                {item.name}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>
                        </Paper>
                    </Box>

                    {/* 세 번째 열 (2) - 상세 지역 목록 */}
                    <Box
                        sx={{
                            flex: 2,
                            display: 'flex',
                            alignItems: 'flex-end',
                            m: 1,
                        }}
                    >
                        <Paper
                            sx={{
                                width: '100%',
                                p: 2,
                                backgroundColor: '#ffffff',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '80%',
                                overflow: 'hidden',
                            }}
                            elevation={1}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    mb: 2,
                                    color: Theme.palette.primary.main
                                }}
                            >
                                {selectedRegion ? `${selectedRegion} 상세 지역` : '상세 지역'}
                            </Typography>
                            <Box sx={{
                                overflow: 'auto',
                                flex: 1,
                                '&::-webkit-scrollbar': {
                                    width: '6px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: Theme.palette.primary[200],
                                    borderRadius: '4px',
                                },
                            }}>
                                {selectedRegion ? (
                                    <Stack spacing={1.5}>
                                        {getSubAreas().map((subArea, index) => (
                                            <Box
                                                key={index}
                                                onClick={() => setSelectedSubArea(subArea)}
                                                sx={{
                                                    p: 1.5,
                                                    borderRadius: 1,
                                                    cursor: 'pointer',
                                                    backgroundColor: selectedSubArea === subArea
                                                        ? Theme.palette.primary[200]
                                                        : 'transparent',
                                                    borderLeft: selectedSubArea === subArea
                                                        ? `4px solid ${Theme.palette.primary.main}`
                                                        : '4px solid transparent',
                                                    transition: 'all 0.2s',
                                                    '&:hover': {
                                                        backgroundColor: selectedSubArea === subArea
                                                            ? Theme.palette.primary[200]
                                                            : Theme.palette.primary[100],
                                                    }
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: selectedSubArea === subArea ? 'bold' : 'normal',
                                                        color: selectedSubArea === subArea ? Theme.palette.primary.main : 'inherit'
                                                    }}
                                                >
                                                    {subArea}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                ) : (
                                    <Typography sx={{color: '#B0B0B0'}}>
                                        왼쪽에서 지역을 선택해주세요
                                    </Typography>
                                )}
                            </Box>
                        </Paper>
                    </Box>

                    {/* 네 번째 열 (2) - 선택된 값 표시 */}
                    <SelectedInfo/>

                </Stack>
            </Box>

            {/* 하단 영역 (1) */}
            <Paper
                sx={{
                    height: '120px',
                    p: 2,
                    m: 1,
                    backgroundColor: Theme.palette.primary[100],
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                }}
                elevation={1}
            >
                <Stack
                    direction="row"
                    spacing={4}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        variant="outlined"
                        disabled
                        sx={{
                            minWidth: '150px',
                            py: 1.5,
                            px: 4,
                            borderColor: Theme.palette.primary.main,
                            color: Theme.palette.primary.main,
                            '&:hover': {
                                borderColor: Theme.palette.primary.dark,
                                backgroundColor: Theme.palette.primary[50],
                            }
                        }}
                    >
                        이전으로
                    </Button>

                    <Button
                        variant="contained"
                        onClick={()=> navigate('/selectProgramTarget')}
                        disabled={!selectedRegion || !selectedSubArea}
                        sx={{
                            minWidth: '150px',
                            py: 1.5,
                            px: 4,
                            backgroundColor: Theme.palette.primary.main,
                            '&:hover': {
                                backgroundColor: Theme.palette.primary.dark,
                            },
                            '&.Mui-disabled': {
                                backgroundColor: '#CCCCCC',
                                color: '#666666'
                            }
                        }}
                    >
                        다음으로
                    </Button>
                </Stack>
            </Paper>
        </Stack>
    );
}

export default SelectRegion;