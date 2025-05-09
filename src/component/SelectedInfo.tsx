import {Box, Paper, Stack, Typography} from "@mui/material";
import Theme from "../common/Theme.ts";
import useSelectedStore from "../store/useSelectedStore";

type SelectedInfoProps = {
    paperProps?: object; // 추가 Paper props를 위한 타입
};

const SelectedInfo = ({paperProps = {}}: SelectedInfoProps) => {
    // Zustand 스토어에서 선택된 값들 가져오기
    const {
        selectedRegion,
        selectedSubArea,
        selectedProgramTarget,
        selectedProgramType,
        selectedInstitution,
        selectedConsulting
    } = useSelectedStore();

    // 선택된 값이 하나라도 있는지 확인
    const hasAnyValue = selectedRegion
        || selectedSubArea
        || selectedProgramTarget
        || selectedProgramType
        || selectedInstitution
        || selectedConsulting;

    return (
        <Paper
            sx={{
                flex: 2,
                p: 3,
                m: 1,
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                ...paperProps
            }}
            elevation={1}
        >
            <Typography variant="h6" sx={{fontWeight: 'bold', mb: 3, color: Theme.palette.primary.main}}>
                선택한 정보
            </Typography>

            {hasAnyValue ? (
                <Stack spacing={2}>
                    <Box>
                        <Typography variant="body2" sx={{color: '#B0B0B0'}}>
                            선택한 지역
                        </Typography>
                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                            {selectedRegion || "-"}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="body2" sx={{color: '#B0B0B0'}}>
                            선택한 세부 지역
                        </Typography>
                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                            {selectedSubArea || "-"}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="body2" sx={{color: '#B0B0B0'}}>
                            선택한 프로그램 전문가
                        </Typography>
                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                            {selectedProgramTarget || "-"}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="body2" sx={{color: '#B0B0B0'}}>
                            선택한 프로그램 유형
                        </Typography>
                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                            {selectedProgramType || "-"}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="body2" sx={{color: '#B0B0B0'}}>
                            시설 유형
                        </Typography>
                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                            {selectedInstitution || "-"}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="body2" sx={{color: '#B0B0B0'}}>
                            상담 진행 방식
                        </Typography>
                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                            {selectedConsulting || "-"}
                        </Typography>
                    </Box>
                </Stack>
            ) : (
                <Typography sx={{color: '#B0B0B0'}}>
                    원하는 전문가를 찾아보세요
                </Typography>
            )}
        </Paper>
    );
};

export default SelectedInfo;