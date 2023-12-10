import { Box, Container, Paper, Typography } from '@mui/material';
import { rgba } from 'polished';
import React from 'react';
import bgFirst from '../../assets/images/about/bg-1.png';
import bgSecond from '../../assets/images/about/bg-2.png';
import image1 from '../../assets/images/about/left-img-1.png';
import image3 from '../../assets/images/about/left-img-3.png';
import image2 from '../../assets/images/about/right-img-2.png';
import { Colors } from '../../styles/theme';
import styles from './styles.module.scss';

const HeaderTypography = ({ children }) => {
  return (
    <Typography variant='h4' fontWeight={'bold'} mb={2} color={Colors.primary}>
      {children}
    </Typography>
  );
};
const AboutPage = () => {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Box
        sx={{
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '100vh', // Set width to full viewport width
          backgroundImage: `url(${bgFirst})`,
          backgroundSize: 'contain',
          display: 'flex',
          flexDirection: 'column',

          alignItems: 'center',
        }}
      >
        <Typography
          variant='h3'
          fontWeight={'500'}
          sx={{ color: 'white', mt: '15vh' }}
        >
          TỪ NÔNG TRẠI TRAO GỬI YÊU THƯƠNG
        </Typography>
      </Box>
      <Container sx={{ textAlign: 'center' }}>
        <HeaderTypography>LÀ MỨT FARM</HeaderTypography>
        <Typography mb={2} variant='h5'>
          Thức quà Đà Lạt trao gửi yêu thương
        </Typography>
        <Typography>
          Được thành lập với niềm đam mê và lòng yêu thương đặc sản nơi đây,
          chúng tôi là một doanh nghiệp kinh doanh chuyên về các loại sản phẩm
          đặc biệt từ vùng đất phong phú của Đà Lạt. Hãy cùng chúng tôi khám phá
          và tận hưởng hương vị đặc trưng, sự độc đáo và tinh hoa của Đà Lạt qua
          từng sản phẩm đầy tâm huyết!
        </Typography>
      </Container>
      <Box
        className={styles.slideInFromLeft1}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <img src={image1} style={{ width: '50vw' }} alt='Ảnh' />
        <Box sx={{ flex: 1, textAlign: 'end', mr: 8 }}>
          <HeaderTypography>Nguyên liệu chọn lọc</HeaderTypography>
          <Typography>
            Tại công ty chúng tôi, chúng tôi tận tâm chọn lọc những nguyên liệu
            tươi ngon nhất, kết hợp cùng sự khéo léo trong chế biến để tạo ra
            những sản phẩm chất lượng và độc đáo. Sứ mệnh của chúng tôi không
            chỉ đơn giản là cung cấp những món đặc sản độc đáo, mà còn là để
            mang đến cho mọi người trải nghiệm hương vị tuyệt vời và sự phong
            phú của văn hóa ẩm thực Đà Lạt.{' '}
          </Typography>
        </Box>
      </Box>
      <Box
        className={styles.slideInFromRight}
        sx={{
          width: '100vw', // Set width to full viewport width
          height: '120vh', // Set height to full viewport height
          backgroundImage: `url(${bgSecond})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Container>
          <HeaderTypography>
            Sự hòa quyện giữa nguyên liệu và nghệ thuật
          </HeaderTypography>
          <Typography mb={4}>
            Chúng tôi tin rằng mỗi sản phẩm không chỉ là kết quả của nguyên liệu
            tốt mà còn là sự hòa quyện giữa nghệ thuật và tâm huyết. Sự kỹ thuật
            và đam mê của người thợ làm nên những sản phẩm đặc biệt, mang đậm
            dấu ấn văn hóa Đà Lạt.
          </Typography>
          <Typography>
            Sự hòa quyện này không chỉ là quá trình kỹ thuật mà còn chứa đựng
            tinh thần, truyền thống và câu chuyện đằng sau mỗi sản phẩm. Việc
            kết hợp giữa nguyên liệu tốt và nghệ thuật chế biến tạo ra những đặc
            sản không chỉ đơn thuần là thức ăn mà còn là tác phẩm nghệ thuật đặc
            sắc, thấu hiểu và tôn vinh vẻ đẹp tự nhiên cùng văn hóa ẩm thực của
            Đà Lạt.
          </Typography>
        </Container>
        <img src={image2} style={{ flex: 1 }} alt='Ảnh' />
      </Box>
      <Box
        className={styles.slideInFromLeft2}
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <img src={image3} style={{ width: '50vw' }} alt='Ảnh' />
        <Box sx={{ flex: 1, textAlign: 'end', mr: 4 }}>
          <HeaderTypography>Thiên nhiên và con người</HeaderTypography>
          <Typography mb={4}>
            Chúng tôi cam kết thực hiện các phương pháp sản xuất bền vững và hài
            hòa với môi trường để bảo vệ cảnh quan tự nhiên và sức khỏe của cộng
            đồng địa phương. Đồng thời, chúng tôi cũng hướng tới việc thúc đẩy
            nền kinh tế cộng đồng, tạo điều kiện công bằng và bền vững cho người
            lao động nơi đây.
          </Typography>
          <Typography>
            Sản phẩm của chúng tôi không chỉ là hàng hóa mà còn là câu chuyện về
            lòng nhiệt thành, tâm huyết và tình yêu với vùng đất Đà Lạt. Chúng
            tôi hy vọng rằng mỗi món đặc sản mà quý khách hàng trải nghiệm sẽ là
            một hành trình khám phá văn hóa ẩm thực đặc biệt của Đà Lạt - từ vị
            ngon đặc trưng đến câu chuyện đằng sau mỗi sản phẩm.
          </Typography>
        </Box>
      </Box>
      <Paper
        sx={{ backgroundColor: rgba(117, 178, 146, 0.2), py: 4, px: 2, mx: 4 }}
      >
        <Container sx={{ textAlign: 'center' }}>
          <HeaderTypography>LỜI KẾT</HeaderTypography>
          <Typography>
            Tầm nhìn của chúng tôi không chỉ là sản xuất sản phẩm chất lượng, mà
            còn là xây dựng một môi trường bền vững, hỗ trợ cộng đồng địa phương
            và góp phần vào việc bảo vệ thiên nhiên. Chân thành cảm ơn sự ủng hộ
            của quý khách hàng và hứa rằng chúng tôi sẽ tiếp tục mang đến những
            sản phẩm chất lượng cao và trải nghiệm tuyệt vời nhất cho mọi người.
          </Typography>
        </Container>
      </Paper>
    </Box>
  );
};

export default AboutPage;
