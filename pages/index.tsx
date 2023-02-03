/*----------------IMPORTS-----------------------*/
  import { ChangeEvent, useContext, useState } from 'react';
  import type { GetServerSideProps, NextPage } from 'next';
  import Head from 'next/head';
  import { Context } from '../contexts/Context';

  //Css's
  import style from '../styles/Home.module.css';

  //Components
  import { Button1 } from '../components/Button1';
  import { SkillBox } from '../components/SkillBox';
  import { SkillBox2 } from '../components/SkillBox2';
import { systemStatus } from '../helpers/systemStatus';
/*----------------------------------------------*/


const Home: NextPage = () => {

  /*----------------STATES-----------------------*/
    const [ questions, setQuestions ] = useState([false]);
    const [ search, setSearch ] = useState('');
  /*---------------------------------------------*/

  /*--------------FUNCTIONS----------------------*/
    const openQuestion = (index: number) => {
      let list = [];

      for(let i = 0; i < questions.length; i++)
        list[i] = false;

      list[index] = true;
      setQuestions(list);
    }

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    }
  /*---------------------------------------------*/

  return (
    <>
      <Head>
        <title>MyDocumentation - Your documentation simplified</title>
        
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="title" content="MyDocumentation" />
        <meta name="description" content="This system is for you who are looking for documentation in different languages in a simplified and easy to understand way." />
        <meta name="author" content="Vanderson Tiago de Paulo"/>
        <meta name="keywords" content="" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:3000/" />
        <meta property="og:title" content="MyDocumentation" />
        <meta property="og:description" content="This system is for you who are looking for documentation in different languages in a simplified and easy to understand way." />
        <meta property="og:image" content="http://localhost:3000/assets/imagem/image.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://localhost:3000/" />
        <meta property="twitter:title" content="MyDocumentation" />
        <meta property="twitter:description" content="This system is for you who are looking for documentation in different languages in a simplified and easy to understand way." />
        <meta property="twitter:image" content="http://localhost:3000/assets/imagem/image.png" />
      </Head>

      <header className={style.header}>
        {/*Menu Destok*/}
        <section className={style.header__menuDesktop}>
          <img className={style.menuBar__logo} src="http://localhost:3000/assets/images/logo.png" alt="my documentation logo" />
          <Button1 text="Documentation" path="/docs"/>
        </section>

        {/*Menu Mobile*/}
        <section className={style.header__menuMobile}>
          <img className={style.menuBar__logo} src="http://localhost:3000/assets/images/logo.png" alt="my documentation logo" />
          <div className={style.docIcon}><i className="fa-solid fa-file-lines"></i></div>
        </section>

        <section className={style.header__infoHeader}>
          <h1 className={style.infoHeader__title}>Simplified and Detailed Documentation</h1>
          <h4 className={style.infoHeader__subTitle}>To help developers improve productivity</h4>
          
          <div className={style.infoHeader__searchDoc}>
            <input className={style.searchDoc__input} type="text" placeholder="Search" value={search} onChange={handleSearchInput} />
            <Button1 text="Search" path={"/docs?search="+search} />
          </div>

          <div className={style.infoHeader__featuredDocs}>
            <p className={style.featuredDocs__title}>Popular: </p>
            <button className={style.featuredDocs__button}>PHP</button>
            <button className={style.featuredDocs__button}>Node</button>
            <button className={style.featuredDocs__button}>Adonis</button>
          </div>
        </section>

      </header>
      
      <main>
        
        <section className={`${style.services} ${style.container}`}>
          <SkillBox img="lamp.png" title="Knowledge Base" text="Basic and necessary knowledge in technologies." />
          <SkillBox img="paper.png" title="Courseware" text="Fully simplified material for you to understand quickly." />
          <SkillBox img="msg.png" title="Constant Updates" text="The documentation is constantly being improved to help you more." />
        </section>

        <section className={`${style.about} ${style.container} `}>
          <div className={style.about__info}>
            <h2 className={style.title}>A Little About The System</h2>
            <p className={style.text}>The objective of our system is to simplify the documentation of different technologies, making it as clear as possible. We simplify all the documentation, teaching only the foundation needed to learn a technology.</p>
          </div>
          <div>
            <img className={style.star1} src="http://localhost:3000/assets/images/star.png" alt="star image" />
            <img  className={style.star2} src="http://localhost:3000/assets/images/star.png" alt="star image" />
            <img  className={style.star3} src="http://localhost:3000/assets/images/star.png" alt="star image" />
          </div>
          <img className={style.about__image} src="http://localhost:3000/assets/svgs/night.png" alt="night image" />
        </section>

        <section className={`${style.docs} ${style.container}`}>
          <h2 className={style.title}>Our Documentations</h2>
          <p className={style.text}>Check out some of our most popular documentation below.</p>
          <div className={style.docs__box}>
            <SkillBox2 img="phpImg.png" title="PHP Language" text="Documentation with best practices and methods to build your project with PHP." />
            <SkillBox2 img="nodeImg.png" title="Node.js" text="All the necessary material for you to start from scratch until your application online." />
            <SkillBox2 img="adonisImg.png" title="Framework Adonis" text="Everything you need to build a fully functional web application or API server with Adonis." />
            <SkillBox2 img="laravelImg.png" title="Framework Laravel" text="Web application development following the model-view-controller pattern with laravel." />
            <SkillBox2 img="mysqlImg.png" title="Sgbd mysql" text="Database creation for data storage and manipulation using Mysql." />
          </div>
        </section>
        
        <section className={`${style.banner} ${style.container}`}>
          <img src="http://localhost:3000/assets/svgs/seatedMan.png" />
          <h3>Check out all our documentation for free</h3>
          <Button1 text="Check" path="/docs" />
        </section>

        <section className={`${style.questions} ${style.container}`}>
          <h2 className={style.title}>Frequently Asked Questions</h2>
          <p className={style.text}>Below you will find answers to the most common questions. Read them to learn more about our free system</p>
          <div className={style.questions__content}>
            <img src="http://localhost:3000/assets/svgs/question.png" alt="question image" />
            <div className={style.content_questions}>
              <div className={style.questions__questionSingle}>
                <div onClick={() => openQuestion(0)} className={`${style.questionSingle__title} ${(questions[0]) ? style.questionOpened : ''}`}>
                  <h4>Does this system replace official documentation?</h4>
                  <i className="fa-solid fa-plus"></i>
                </div>
                {questions[0] &&
                  <div className={`${style.questionSingle__content} ${style.text}`}>
                    No way! our documentations simply cover the most important things about that technology, but not quite like the official documentation.
                    Its purpose is simply to explain in a more simplified way, the things that you will use most of that particular technology.
                  </div>
                }
              </div>
              <div className={style.questions__questionSingle}>
                <div onClick={() => openQuestion(1)} className={`${style.questionSingle__title} ${(questions[1]) ? style.questionOpened : ''}`}>
                  <h4>Do I need to pay anything to use it?</h4>
                  <i className="fa-solid fa-plus"></i>
                </div>
                {questions[1] && 
                  <div className={`${style.questionSingle__content} ${style.text}`}>
                    definitely not, you can use it for free without any kind of restriction.
                  </div>
                }
              </div>
              <div className={style.questions__questionSingle}>
                <div onClick={() => openQuestion(2)} className={`${style.questionSingle__title} ${(questions[2]) ? style.questionOpened : ''}`}>
                  <h4>Can I study some technology through these documentations?</h4>
                  <i className="fa-solid fa-plus"></i>
                </div>
                {questions[2] && 
                  <div className={`${style.questionSingle__content} ${style.text}`}>
                    Of course, here you will get a lot of material that will help you a lot.
                  </div>
                }
              </div>
              <div className={style.questions__questionSingle}>
                <div onClick={() => openQuestion(3)} className={`${style.questionSingle__title} ${(questions[3]) ? style.questionOpened : ''}`}>
                  <h4>How do I suggest some documentation?</h4>
                  <i className="fa-solid fa-plus"></i>
                </div>
                {questions[3] && 
                  <div className={`${style.questionSingle__content} ${style.text}`}>
                    Soon we'll create this feature and you'll be able to send us your suggestions.
                  </div>
                }
              </div>
            </div>
          </div>
        </section>
        
      </main>

      <footer className={style.footer}>

        <img src="http://localhost:3000/assets/svgs/newletters.png" alt="newsletter image" />

        <section className={style.newsletters}>
          <div className={style.newsletters__info}>
              <h3>Newsletters</h3>
              <p className={style.text}>Subscribe and get notification from us</p>
          </div>
          <div className={style.form}>
            <input type="text" placeholder="Enter your email here" />
            <Button1 text="Subscribe" path="/" />
          </div>
        </section>

        <section className={style.footerContent}>
          <h4>Some of our docs</h4>
          <div className={style.footerContent__boxGroups}>
                <div className={style.boxGroups__group}>
                  <p>Documentação Php</p>
                  <p>Documentação Node</p>
                  <p>Documentação Next</p>
                </div>
                <div className={style.boxGroups__group}>
                  <p>Documentação React.js</p>
                  <p>Documentação Adonis</p>
                  <p>Documentação CodIgniter</p>
                </div>
                <div className={style.boxGroups__group}>
                  <p>Documentação Laravel</p>
                  <p>Documentação Git/GitHub</p>
                  <p>Documentação Java</p>
                </div>
                <div className={style.boxGroups__group}>
                  <p>Documentação Pyton</p>
                  <p>Documentação C/C++</p>
                  <p>Documentação Html/Css</p>
                </div>
          </div>
          <p className={style.copyright}>MyDocumentations © Todos os Direitos reservados</p>
        </section>

      </footer>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  /*Check if the system is active.*/
  let systemActive = await systemStatus();

  if(!systemActive)
    return {
        redirect: {
            destination: '/error',
            permanent: false,
        },
    }
  

  return {props: {}}
}