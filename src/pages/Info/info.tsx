import {
  CommentOutlined,
  GithubOutlined,
  LaptopOutlined,
  ScheduleOutlined,
  SoundOutlined,
} from '@ant-design/icons';

import { Button, Carousel, Divider, Image, Space, Tag } from 'antd';
import { Link } from 'react-router-dom';

import Screen_1 from '../../assets/images/pagesScreens/screen1_light.png';
import Screen_2 from '../../assets/images/pagesScreens/screen2.png';
import Screen_3 from '../../assets/images/pagesScreens/screen3.png';
import Screen_4 from '../../assets/images/pagesScreens/screen4.png';
import LeftQuote from '../../assets/images/logo/left-quote (1).png';
import RightQuote from '../../assets/images/logo/right-quotation-sign.png';
import LukshaOlyaImg from '../../assets/images/teamPhoto/olkaLuksha.png';
import HapikusImg from '../../assets/images/teamPhoto/hapikus.png';
import Logo from '../../assets/images/logo/download (1).png';
import styles from './info.module.css';
import greetingStyles from './greeting.module.css';

function InfoPage() {
  return (
    <div className={styles.pageContainer}>
      <section className={styles.sectionContaier}>
        <div className={styles.infoMainContaier}>
          <div className={styles.textAbout}>
            <div className={greetingStyles.content}>
              <div className={greetingStyles.content__container}>
                <p className={greetingStyles.content__container__text}>Hello</p>
                <ul className={greetingStyles.content__container__list}>
                  <li className={greetingStyles.content__container__list__item}>
                    world !
                  </li>
                  <li className={greetingStyles.content__container__list__item}>
                    team !
                  </li>
                  <li className={greetingStyles.content__container__list__item}>
                    everybody!
                  </li>
                  <li className={greetingStyles.content__container__list__item}>
                    users !
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.teamGreet}>
              <h3>
                Hello and welcome to CodeFrondlers Team,
                a group of <b>three young frontend developers</b> who have come together to
                create an online store website. We are thrilled to have you here and hope you
                enjoy your experience browsing our carefully crafted website.
                <hr />
                Happy shopping!
              </h3>
            </div>
          </div>
          <div className={styles.logo}>
            <img src={Logo} alt="logo" />
          </div>
        </div>
        <div className={styles.containerBtn}>
          <Link to="/">
            <Button size="large" style={{ width: '170px', height: '50px' }}>
              Start Shopping
            </Button>
          </Link>
          <Link to="/project">
            <Button size="large" style={{ width: '170px', height: '50px' }}>
              Read about project
            </Button>
          </Link>
        </div>
      </section>
      <section className={styles.aboutTeamContainer}>
        <div className={styles.sectionContaier}>
          <div className={styles.sectionTitle}>
            <h2> How we work </h2>
          </div>
          <div className={styles.row}>
            <div className={styles.columnCapabilitis}>
              <div className={styles.icon}>
                <CommentOutlined />
              </div>
              <h3> Effective communication </h3>
              <p>
                Understand the importance of clear and timely communication for
                successful project development.
              </p>
            </div>
            <div className={styles.columnCapabilitis}>
              <div className={styles.icon}>
                <ScheduleOutlined />
              </div>
              <h3> Synchronized work </h3>
              <p>
                Collaborate effectively, sharing ideas and knowledge to achieve
                a common goal. Delegate tasks. Achieve success together.
              </p>
            </div>
            <div className={styles.columnCapabilitis}>
              <div className={styles.icon}>
                <LaptopOutlined />
              </div>
              <h3> Modern Web Development </h3>
              <p>
                Listen to the needs and expectations in order to create a unique
                online space for the store.
              </p>
            </div>
            <div className={styles.columnCapabilitis}>
              <div className={styles.icon}>
                <SoundOutlined />
              </div>
              <h3> Flexibility and adaptability</h3>
              <p>
                Ready to adapt to changes and fix errors on the go. Quickly
                respond to feedback and offer alternative solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.teamMemberContainer}>
        <div className={styles.sectionContaier}>
          <div className={styles.teamMemberInfo}>
            <div className={styles.photoBlock}>
              <div className={styles.personPhoto}>
                <div className={styles.personPhotoContainer}>
                  <div className={styles.personPhotoContainerInner}>
                    <img
                      className={styles.img}
                      alt="personal-img"
                      src={LukshaOlyaImg}
                    />
                  </div>
                </div>
                <div className={styles.divider}>
                  <div className={styles.name}>
                    OLYA LUKSHA
                    <Link to="https://github.com/Lukshaolya">
                      <GithubOutlined />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.textAboutLearning}>
                <span className={styles.quotes}>
                  <img src={LeftQuote} alt="quote" />
                </span>{' '}
                <p>Programing is a big love, but ... is not so easy</p>{' '}
                <span className={styles.quotes}>
                  <img className={styles.rightQuote} src={RightQuote} alt="quote" />
                </span>
              </div>
              <div className={styles.textAboutTeamMember}>
                <h4>
                  I have been working as an economist in the energy industry for three years.
                  I enjoy solving problems and constantly striving for higher goals.
                  I entered the field of programming without any technical experience
                  and as it turned out, with limited computer skills.
                </h4>
                <h4>
                  There is still a lot for me to learn. This project helped me identify my weaknesses and gain experience in teamwork.
                </h4>
              </div>
              <div className={styles.textAboutTeamMember}>
                <Divider orientation="left">Got experience</Divider>
                <Space size={[1, 10]} wrap>
                  <Tag color="geekblue">Crazy about React components</Tag>
                  <Tag color="geekblue">Wish to use Ant design forever</Tag>
                  <Tag color="geekblue">Grow up whith Team</Tag>
                </Space>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.teamMemberContainer}>
        <div className={styles.sectionContaier}>
          <div className={styles.teamMemberInfo}>
            <div className={styles.infoBlock}>
              <div className={styles.textAboutLearning}>
                <span className={styles.quotes}>
                  <img src={LeftQuote} alt="quote" />
                </span>{' '}
                <p>Those how know.....know</p>{' '}
                <span className={styles.quotes}>
                  <img className={styles.rightQuote} src={RightQuote} alt="quote" />
                </span>
              </div>
              <div className={styles.textAboutTeamMember}>
                <h4>
                  More than 5 years of experience in the field of technology,
                 
                </h4>
                <h4>
                  More than 6 years of experience working with clients and users,
                  
                </h4>
              </div>
              <div className={styles.textAboutTeamMember}>
                <Divider orientation="left">Got experience</Divider>
                <Space size={[1, 10]} wrap>
                  <Tag color="geekblue">Backend Development</Tag>
                  <Tag color="geekblue">Workung with Redux Toolkit</Tag>
                  <Tag color="geekblue">Expirience in Team Development</Tag>
                </Space>
              </div>
            </div>
            <div className={styles.photoBlock}>
              <div className={styles.personPhoto}>
                <div className={styles.personPhotoContainer}>
                  <div className={styles.personPhotoContainerInner}>
                    <img
                      className={styles.img}
                      alt="personal-img"
                      src={HapikusImg}
                    />
                  </div>
                </div>
                <div className={styles.divider}>
                  <div className={styles.name}>
                  ALEXANDER BUDKO
                    <Link to="https://github.com/swallowOnes">
                      <GithubOutlined />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.teamMemberContainer}>
        <div className={styles.sectionContaier}>
          <div className={styles.teamMemberInfo}>
            <div className={styles.photoBlock}>
              <div className={styles.personPhoto}>
                <div className={styles.personPhotoContainer}>
                  <div className={styles.personPhotoContainerInner}>
                    <img
                      className={styles.img}
                      alt="personal-img"
                      src={HapikusImg}
                    />
                  </div>
                </div>
                <div className={styles.divider}>
                  <div className={styles.name}>
                  SERGEY CHIKUNOV
                    <Link to="https://github.com/hapikus">
                      <GithubOutlined />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.textAboutLearning}>
                <span className={styles.quotes}>
                  <img src={LeftQuote} alt="quote" />
                </span>{' '}
                <p>Those how know.....know</p>{' '}
                <span className={styles.quotes}>
                  <img className={styles.rightQuote} src={RightQuote} alt="quote" />
                </span>
              </div>
              <div className={styles.textAboutTeamMember}>
                <h4>
                  More than 5 years of experience in the field of technology,
                  including positions as a business analyst, technical support specialist,
                  and working on a country-level optimization project.
                  This experience has given me a deep understanding of technical
                  concepts and the ability to analyze complex technical problems.
                </h4>
                <h4>
                  More than 6 years of experience working with clients and users,
                  solving their problems in positions such as a sales consultant,
                  administrator, and technical support specialist. In these roles,
                  I honed my communication skills, the ability to listen to users,
                  and understand the essence of the problem.
                </h4>
              </div>
              <div className={styles.textAboutTeamMember}>
                <Divider orientation="left">Got experience</Divider>
                <Space size={[1, 10]} wrap>
                  <Tag color="geekblue">Backend Development</Tag>
                  <Tag color="geekblue">Workung with Redux Toolkit</Tag>
                  <Tag color="geekblue">Expirience in Team Development</Tag>
                </Space>
              </div>
            </div>
          </div>
        </div>
      </section>
     
      <section className={styles.productConatiner}>
        <div className={styles.sectionContaier}>
          <div className={styles.aboutProductBlock}>
            <div className={styles.productSlader}>
              <Carousel
                className={styles.imgCarousel}
                dots={{ className: styles.carouselDots }}
                autoplay
              >
                <div>
                  <Image
                    src={Screen_1}
                    alt="CAPSULE"
                    width="100%"
                    style={{ height: '100%', borderRadius: '5%' }}
                    className={styles.carouselItemImg}
                  />
                </div>
                <div>
                  <Image
                    src={Screen_2}
                    alt="CAPSULE"
                    style={{ height: '100%', borderRadius: '5%' }}
                    className={styles.carouselItemImg}
                  />
                </div>
                <div>
                  <Image
                    src={Screen_3}
                    alt="CAPSULE"
                    style={{ height: '100%', borderRadius: '5%' }}
                    className={styles.carouselItemImg}
                  />
                </div>
                <div>
                  <Image
                    src={Screen_4}
                    alt="CAPSULE"
                    style={{ height: '100%', borderRadius: '5%' }}
                    className={styles.carouselItemImg}
                  />
                </div>
              </Carousel>
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productInfoTitle}>
                <h3>Our case</h3>
              </div>
              <div>
                <p className={styles.progectName}> Super Store</p>
                <p className={styles.progectDiscription}>
                  {' '}
                  is more than just an online retailer. Its a gaming haven where
                  passion, affordability, and community come together. Join us
                  today and experience the convenience, variety, and excitement
                  of shopping for video games without leaving the comfort of
                  your home.
                </p>
                <Link to="/project">
                  <Button size="large">Learn more</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InfoPage;
