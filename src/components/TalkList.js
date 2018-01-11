import React from 'react'
import PropTypes from 'prop-types'
import TalkItem from './TalkItem'
import './TalkList.css'

const TalkList = ({talks, onVoteForTalk}) => {
  return (
    <div className="TalkList">
      {talks.length === 0 ?
        'Feel free to submit your talk.' :
        talks.map(talk => {
          const {id} = talk
          return (
            <TalkItem
              key={id}
              talk={talk}
              onVote={() => { onVoteForTalk(id) }}
            />
          )
        })
      }
    </div>
  )
}

TalkList.propTypes = {
  talks: PropTypes.array.isRequired,
  onVoteForTalk: PropTypes.func.isRequired,
}

export default TalkList
