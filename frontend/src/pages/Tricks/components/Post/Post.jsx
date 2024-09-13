
import React from 'react';
import Config from '../../../../config';
import './Post.css'; // Import CSS file for styling

const Post = ({ data }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
      {data.map(tip => (
        <div className="post" key={tip.id}>
          <div className="post-actions"> {tip.title} </div>
          <div className="post-header">
            <img src={`${Config.mediaURL}${tip.author?.width_image}`} alt="Author" className="author-image" />
            <div className="author-name">{tip.author?.user_full_name}
              <br /> <div className="created-at">{formatDate(tip.created_at)}</div>
            </div>
            <div className="created-cat">{tip?.category?.title}</div>
          </div>
          <div className="post-content">
            <p className="text-content">{tip.content}</p> </div>
          {tip.Image && <img src={`${Config.mediaURL}${tip.Image}`} className="image-content" alt={tip.title} />}

        </div>
      ))}
    </>
  );
};

export default Post;
