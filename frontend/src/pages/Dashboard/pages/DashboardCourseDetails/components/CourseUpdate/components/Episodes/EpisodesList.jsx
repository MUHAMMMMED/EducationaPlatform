
import React, { useState } from 'react';
import { CgTranscript } from "react-icons/cg";
import { FiYoutube } from "react-icons/fi";
import { MdLiveTv, MdOutlineOndemandVideo, MdOutlineQuiz, MdVideoLibrary } from "react-icons/md";
import { PiBookOpenTextLight } from "react-icons/pi";
import EpisodeUpdate from './EpisodeUpdate';

export default function EpisodesList({ item, Course, fetchCourse }) {
  const [showMore, setShowMore] = useState(false);
  const visibleEpisodes = showMore ? item.episodes : item.episodes.slice(0, 3).sort((a, b) => a.serial_number - b.serial_number);

  return (
    <>
      <div className="Course_cardicon">
        {visibleEpisodes.map((episode) => (
          <div className="CourseCard" key={episode.id} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
            <div className="Course_card_content" style={{ border: '1px solid #ddd;' }}>
              <div>
                <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><MdVideoLibrary /></span></div>
                <div style={{ float: 'left' }}>
                  <p className="Course_card_title" style={{ textAlign: 'left', fontWeight: '700' }}>
                    <samp style={{
                      background: '#000', color: '#fff', padding: ' 3px 8px', borderRadius: '5px', fontSize:
                        '15px', marginRight: '5px'
                    }}>{episode.serial_number}</samp>{episode.title}  </p>
                  <p className="Course_card_amount" style={{ textAlign: 'left', marginTop: '5px', fontWeight: '700', fontSize: '30px', float: 'left' }} >
                    {(episode.is_preview) ? <MdLiveTv /> : ''}  </p>
                </div>
                <div style={{ float: 'left' }}>

                  {(episode.video_id) ? '' : <p className="Course_card_amount" style={{ textAlign: 'left', marginTop: '10px', fontWeight: '700', fontSize: '30px', float: 'left', marginRight: '15px' }} >
                    <FiYoutube /> </p>}

                  {(episode.video_link) ? '' : <p className="Course_card_amount" style={{ textAlign: 'left', marginTop: '10px', fontWeight: '700', fontSize: '30px', float: 'left', marginRight: '15px' }} >
                    <MdOutlineOndemandVideo /></p>}

                  {(episode.material_link) ? '' :
                    <p className="Course_card_amount" style={{ textAlign: 'left', marginTop: '10px', fontWeight: '700', fontSize: '30px', float: 'left', marginRight: '15px' }} >
                      <PiBookOpenTextLight />  </p>}

                  {(episode.exam) ? '' : <p className="Course_card_amount" style={{ textAlign: 'left', marginTop: '10px', fontWeight: '700', fontSize: '30px', float: 'left', marginRight: '15px' }} >
                    <MdOutlineQuiz /> </p>}

                  {(episode.Transcript) ? '' : <p className="Course_card_amount" style={{ textAlign: 'left', marginTop: '10px', fontWeight: '700', fontSize: '30px', float: 'left', marginRight: '15px' }} >
                    <CgTranscript /> </p>}
                </div>
              </div>

              <div className="Course_cardicon">
                <EpisodeUpdate item={episode} Course={Course} fetchCourse={fetchCourse} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="Course_card_info" style={{ alignItems: "center" }}>
        <div className="Course_cardicon" style={{ width: '60%' }}>
          {!showMore && (
            <button className='Open_button' onClick={() => setShowMore(true)}>Show More</button>
          )}
        </div></div>







    </>
  );
}
