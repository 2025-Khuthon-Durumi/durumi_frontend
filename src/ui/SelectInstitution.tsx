import {Box, Button, Paper, Stack, Typography} from "@mui/material";
import Theme from "../common/Theme.ts";
import useSelectedStore from "../store/useSelectedStore";
import {useNavigate} from "react-router";
import SelectedInfo from "../component/SelectedInfo.tsx";

const SelectInstitution = () => {
    const navigate = useNavigate();

    const {
        selectedInstitution,
        setSelectedInstitution
    } = useSelectedStore();

    // 프로그램 목록
    const programs = [
        {id: 1, name: '치유농장'},
        {id: 2, name: '치유농업기관'},
        {id: 3, name: '치유마을'},
        {id: 4, name: '상관 없음'},
    ];

    return (
        <Stack
            direction="column"
            sx={{
                height: '100vh',
                width: '100%',
            }}
        >
            {/* 상단 영역 */}
            <Box sx={{height: 'calc(100vh - 150px)'}}>
                <Stack
                    direction="row"
                    sx={{
                        height: '100%',
                        width: '100%',
                    }}
                >
                    {/* 첫 번째 열 - 홍보글 (크기 축소) */}
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
                                시설 유형 선택
                            </Typography>
                            <Typography
                                component="div"
                                sx={{color: '#B0B0B0'}}
                            >
                                치유 프로그램을 운영할 시설을 선택해주세요.
                            </Typography>
                        </Stack>
                    </Paper>

                    {/* 두 번째 열 - 프로그램 선택 (크기 확대) */}
                    <Box
                        sx={{
                            flex: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            m: 1,
                        }}
                    >
                        <Paper
                            sx={{
                                width: '100%',
                                p: 3,
                                backgroundColor: '#ffffff',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '80%',
                            }}
                            elevation={1}
                        >
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flex: 1,
                                overflow: 'auto',
                                mt: 2,
                            }}>
                                {programs.map((program) => (
                                    <Paper
                                        key={program.id}
                                        sx={{
                                            width: '48%',
                                            height: '100px',
                                            mb: 2,
                                            p: 3,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: selectedInstitution === program.name
                                                ? `1px solid ${Theme.palette.primary.main}`
                                                : '1px solid',
                                            backgroundColor: selectedInstitution === program.name
                                                ? Theme.palette.primary[50]
                                                : '#ffffff',
                                            transition: 'all 0.2s',
                                            '&:hover': {
                                                backgroundColor: Theme.palette.primary[50],
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                            }
                                        }}
                                        elevation={selectedInstitution === program.name ? 1 : 0}
                                        onClick={() => setSelectedInstitution(program.name)}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 'bold',
                                                color: selectedInstitution === program.name
                                                    ? Theme.palette.primary.main
                                                    : '#000000'
                                            }}
                                        >
                                            {program.name}
                                        </Typography>
                                    </Paper>
                                ))}
                            </Box>
                        </Paper>
                    </Box>

                    <SelectedInfo/>

                </Stack>
            </Box>

            {/* 하단 영역 */}
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
                        onClick={() => navigate('/selectProgramType')}
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
                        onClick={() => navigate('/selectConsulting')}
                        disabled={!selectedInstitution}
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

export default SelectInstitution;