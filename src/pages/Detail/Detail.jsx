import React, { useEffect, useState } from 'react';
import styles from './Detail.module.css';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDetailInfo } from '../../store/modules/fetchDetailInfo';
import Kakao from '../../components/Kakao';
import LoadingSpinner from '../../components/LoadingSpinner.jsx/LoadingSpinner';
import { TfiBook, TfiLocationPin, TfiThumbUp } from 'react-icons/tfi';

export default function Detail() {
  const { infoData, infoLoading } = useSelector((state) => state.fetchDetailInfo);
  const { userEmail } = useSelector((state) => state.user);
  const { isLogin } = useSelector((state) => state.user);
  const { state } = useLocation();
  const dispatch = useDispatch();
  console.log(state);

  useEffect(() => {
    dispatch(fetchDetailInfo(state.contentId));
  }, [state.contentId]);

  const [subscribe, setSubscribe] = useState();

  useEffect(() => {
    const fetchIsCheck = async () => {
      const loginInfo = { email: userEmail, contentId: state.contentId };
      const loginResponse = await fetch('http://3.36.132.58:4500/addLike/isCheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });

      if (loginResponse.status === 200) {
        const result = await loginResponse.json();
        console.log(result.msg);
        setSubscribe(result.msg);
      }
    };

    if (isLogin) {
      fetchIsCheck();
    }
  }, []);

  const fetchLike = async () => {
    const loginInfo = { email: userEmail, contentId: state.contentId };
    const loginResponse = await fetch('http://3.36.132.58:4500/addLike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo),
    });

    if (loginResponse.status === 200) {
      const result = await loginResponse.json();
      setSubscribe(result.msg);
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>{infoData[0]?.title}</h2>
      {infoLoading && <LoadingSpinner />}
      {infoData?.map((data) => (
        <div className={styles.detailWrapper} key={data.contentid}>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={data.firstimage || 'images/gray.jpg'} alt={data.title} />
          </div>

          <div className={styles.timeLine}>
            <div className={styles.timeLineContainer}>
              <div className={styles.timeLineicons}>
                <TfiBook className={styles.infoIcons} />
              </div>
              <div className={styles.timeLinebody}>
                <h4 className={styles.timeLineTitle}>{data.title}</h4>
                <p
                  className={styles.timeLineOverview}
                  dangerouslySetInnerHTML={{ __html: data.overview === '-' ? '' : data.overview }}
                />
                {state.eventstartdate && (
                  <div className={styles.timeLineOverview}>
                    기간 : {state.eventstartdate} ~ {state.eventenddate}
                  </div>
                )}
                {state.tel && <div className={styles.timeLineOverview}>tel : {state.tel}</div>}
              </div>
            </div>

            <div className={styles.timeLineMapContainer}>
              <div className={styles.timeLineiconsMap}>
                <TfiLocationPin className={styles.infoIcons} />
              </div>

              <div className={styles.timeLineMapbody}>
                <h4 className={styles.timeLineMapTitle}>위치</h4>

                <div className={styles.addrWrapper}>
                  <div className={styles.kakaoWrapper}>
                    <Kakao Lat={data.mapy} Lng={data.mapx} />
                  </div>

                  <div className={styles.addrText}>
                    <div className={styles.addr}>{data.addr1}</div>
                    {data.homepage && (
                      <div className={styles.homepage}>
                        <div dangerouslySetInnerHTML={{ __html: data.homepage }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.timeLineLikeContainer}>
              <div className={styles.timeLineiconsLike}>
                <TfiThumbUp className={styles.infoIcons} />
              </div>
              <div className={styles.timeLineLikebody}>
                <div className={styles.timeLineLikeTitle}>
                  {isLogin ? (
                    <h4 className={styles.timeLineLikebtn} onClick={() => fetchLike()}>
                      {subscribe}
                    </h4>
                  ) : (
                    <h4 className={styles.timeLineLikebtn} onClick={() => alert('로그인을 해주세요!')}>
                      구독하기
                    </h4>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
