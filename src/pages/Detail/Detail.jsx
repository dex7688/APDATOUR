import React, { useEffect, useState } from 'react';
import styles from './Detail.module.css';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Kakao from '../../components/Kakao';
import LoadingSpinner from '../../components/LoadingSpinner.jsx/LoadingSpinner';
import { TfiBook, TfiLocationPin, TfiThumbUp } from 'react-icons/tfi';
import { useFetchDetail, useCheckLike, useAddLike } from '../../hooks/useFetchDetail';

export default function Detail() {
  const { userEmail, isLogin } = useSelector((state) => state.user);
  const { state } = useLocation();
  const { data: infoData, isFetching: infoLoading } = useFetchDetail(state?.contentId);
  const [subscribe, setSubscribe] = useState();
  const { mutateAsync } = useCheckLike();
  const { mutateAsync: addLike } = useAddLike();

  useEffect(() => {
    const getLikeState = async () => {
      const loginInfo = { email: userEmail, contentId: state.contentId };
      const response = await mutateAsync(loginInfo);
      const result = await response.data.msg;
      setSubscribe(result);
    };

    if (isLogin) {
      getLikeState();
    }
  }, [isLogin]);

  const fetchLike = async () => {
    const loginInfo = { email: userEmail, contentId: state.contentId };
    const response = await addLike(loginInfo);
    const result = await response.data.msg;
    setSubscribe(result);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>{infoData && infoData[0].title}</h2>
      {infoLoading && <LoadingSpinner />}
      {infoData?.map((data) => (
        <div className={styles.detailWrapper} key={data.contentid}>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={data.firstimage || '/images/gray.jpg'} alt={data.title} />
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
                  <h4
                    className={styles.timeLineLikebtn}
                    onClick={() => {
                      isLogin ? fetchLike() : alert('로그인을 해주세요!');
                    }}
                  >
                    {isLogin ? subscribe : '구독하기'}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
