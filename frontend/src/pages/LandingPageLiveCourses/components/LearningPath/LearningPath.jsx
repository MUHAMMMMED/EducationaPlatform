
import React from 'react';
import { Li_ar, Li_en, ROWLearningPath, TitlE, ULL } from './styles';

export default function LearningPath({ data }) {
  return (
    <ROWLearningPath>
      <TitlE style={{ marginTop: '-15px' }}>{data.Base.title_Learning_Path}</TitlE>
      {data && data.Base.learning_Path && data.Base.learning_Path.map((item) => (
        <div key={item.id}>
          {data.Base.Language === 'ar' ? (
            <>
              <span className="h4_ar gradient-underline-thin">{item.title}</span> <br />
              <ULL>
                {item.point.map((pointItem) => (
                  <Li_ar key={pointItem.id}>
                    <span className="gradient-underline-thin">{pointItem.title} :</span> {pointItem.description}
                  </Li_ar>
                ))}
              </ULL>
            </>
          ) : (
            <>
              <span className="h4_en gradient-underline-thin">{item.title}</span> <br />
              <ULL>
                {item.point.map((pointItem) => (
                  <Li_en key={pointItem.id}>
                    <span className="gradient-underline-thin">{pointItem.title} :</span>

                    <span className='span_point' >{pointItem.description}</span>
                  </Li_en>
                ))}
              </ULL>
            </>
          )}
        </div>
      ))}
    </ROWLearningPath>
  );
}
