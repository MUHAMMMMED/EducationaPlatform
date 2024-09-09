
import React from 'react';
import Config from '../../../../config';
import Reply from '../Reply/Reply';
import Delete from './Delete';
import './Post.css';
import studentImg from './Student.png';


export default function Post({ data, fetchCourse, is_author }) {

  return (
    <div className='Post__container'>
      {data && data.askRoom && data.askRoom.map((item) => (
        <div className='frame__container' key={item.id}>
          <div className="frame__headline">

            {item.student.width_image ? (
              <img className="headline__image" alt="Teacher" src={`${Config.baseURL}${item.student.width_image}`} />
            ) : (
              <img className="headline__image" alt="Student" src={studentImg} style={{ border: '1px solid #ced0d4' }} />
            )}


            <div className="frame__column">
              <p className="headline__title">{item.student.user_full_name}</p>
              <p className="headline__subtitle">{new Date(item.created).toLocaleString("en-US", { year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}</p>
            </div>
          </div>
          <div className="frame__content">
            <p className="frame__text--small">{item.content}</p>
          </div>
          <div className="replies">
            {data && item.parent_comment_answrs && item.parent_comment_answrs.map(answr => (
              <div className="reply" key={answr.id}>
                <div className="frame__headline">
                  {answr.Teacher.width_image ? (
                    <img className="headline__image" alt="Teacher" src={`${Config.baseURL}${answr.Teacher.width_image}`} />
                  ) : (
                    <img className="headline__image" alt="Student" src={studentImg} style={{ border: '1px solid #ced0d4' }} />
                  )}


                  <div className="frame__column">
                    <p className="headline__subtitle"></p>
                    <p className="headline__title" style={{ paddingTop: '10px', color: '#58a58f' }}>{answr.Teacher.user_full_name} </p>
                  </div></div>
                <p className="frame__text--small">{answr.content}</p>
                <div className="post-buttoncontener">
                  {is_author === true && <Delete ItemId={answr.id} fetchCourse={fetchCourse} course={item.course} />}
                </div>
              </div>
            ))}

            <Reply ItemId={item.id} fetchCourse={fetchCourse} course={item.course} is_author={is_author} />

          </div>
        </div>
      ))}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}





