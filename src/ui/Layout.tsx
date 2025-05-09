import {AppBar, Box, Button, Toolbar} from "@mui/material";
import {Outlet, useNavigate} from 'react-router'
import logoImage from "../assets/Layer_1.png";


const Layout = () => {
    const navigate = useNavigate();

    return <>
        <AppBar position="static" sx={{backgroundColor: '#ffffff'}} elevation={0}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* 로고 영역 - 왼쪽 정렬 */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                >
                    <img
                        src={logoImage}
                        alt="로고 이미지"
                        style={{
                            height: '30px', // 로고 높이 고정
                            width: 'auto', // 비율 유지
                            objectFit: 'contain'
                        }}
                    />
                </Box>

                {/* 버튼 영역 - 오른쪽 정렬 */}
                <Box>
                    <Button color="primary">로그인</Button>
                    <Button color="primary">회원가입</Button>
                </Box>
            </Toolbar>
        </AppBar>


        <Box
            component='main'
            sx={{
                height: 'calc(100vh - 64px)', // AppBar 높이를 뺀 나머지 영역
                overflow: 'hidden'
            }}
        >
            <Outlet/>
        </Box>
    </>
}

export default Layout