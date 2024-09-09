import React from 'react';
import FormCreate from './components/Form/FormCreate';
import TimelineItem from './components/TimelineItem';
import './timelinestyles.css'; // Check if the path is correct

function Timeline({ data, fetchCourse }) {


  return (
    <>
      <br />
      <><a href='' class="no-underline" target="_blank">
        <button className="livebutton">
          <samp className="live-samp">
            <div className="live-circle"></div>
            <div className="live-border"></div>
          </samp>
          <samp className="live-text">Join Now</samp>
        </button>
      </a></>    <br />    <br />
      <div className="timeline">



        <div className="titlecenter">
          Course Timeline
          <br />
          <div style={{ width: '60%', margin: 'auto' }}><FormCreate data={data} fetchCourse={fetchCourse} /></div>

        </div>

        <div className="timelinerow">
          {data.timeline
            .sort((a, b) => a.index - b.index)
            .map((item) => (
              <TimelineItem
                key={item.id}
                item={item}
                fetchCourse={fetchCourse}
              />
            ))}
        </div>
      </div></>
  );
}

export default Timeline;

