import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import { styles, createOutline } from './progress_dot_styles';
import { levelProgressShape } from './types';
import { saveAnswersAndNavigate } from '../../levels/saveAnswers';
import color from '../../color';

function dotClicked(url, e) {
  e.preventDefault();
  saveAnswersAndNavigate(url);
}

/**
 * Stage progress component used in level header and course overview.
 */
export const ProgressDot = React.createClass({
  propTypes: {
    level: levelProgressShape.isRequired,
    currentLevelId: React.PropTypes.string,
    courseOverviewPage: React.PropTypes.bool,
    saveAnswersBeforeNavigation: React.PropTypes.bool.isRequired
  },

  render() {
    const level = this.props.level;
    const uid = level.uid || level.id.toString();

    const isUnplugged = isNaN(level.title);
    const showUnplugged = isUnplugged && (this.props.courseOverviewPage || uid === this.props.currentLevelId);
    const outlineCurrent = this.props.courseOverviewPage && uid === this.props.currentLevelId;
    const smallDot = !this.props.courseOverviewPage && uid !== this.props.currentLevelId;
    const showLevelName = level.kind === 'named_level' && this.props.courseOverviewPage;
    const isPeerReview = level.kind === 'peer_review';

    return (
      <a
        key='link'
        href={level.url}
        onClick={this.props.saveAnswersBeforeNavigation && dotClicked.bind(null, level.url)}
        style={[styles.outer, (showLevelName || isPeerReview) && {display: 'table-row'}]}
      >
        {(level.icon && !isPeerReview) ?
          <i
            className={`fa ${level.icon}`}
            style={[
              styles.dot.puzzle,
              this.props.courseOverviewPage && styles.dot.overview,
              styles.dot.icon,
              smallDot && styles.dot.icon_small,
              level.status && level.status !== 'not_tried' && styles.dot.icon_complete,
              outlineCurrent && {textShadow: createOutline(color.level_current)}
            ]}
          /> :
          <div
            className={`level-${level.id} fa ${isPeerReview && level.icon}`}
            style={[
              styles.dot.puzzle,
              this.props.courseOverviewPage && styles.dot.overview,
              smallDot && styles.dot.small,
              level.kind === 'assessment' && styles.dot.assessment,
              outlineCurrent && {borderColor: color.level_current},
              showUnplugged && styles.dot.unplugged,
              styles.status[level.status || 'not_tried']
            ]}
          >
            {(showLevelName || (isPeerReview && level.status === 'attempted')) ? '\u00a0' : level.title}
          </div>
        }
        {(showLevelName || isPeerReview) &&
          <span key='named_level' style={styles.levelName}>
            {level.name}
          </span>
        }
      </a>
    );
  }
});
export default connect((state, ownProps) => ({
  currentLevelId: state.currentLevelId,
  saveAnswersBeforeNavigation: state.saveAnswersBeforeNavigation
}))(Radium(ProgressDot));
