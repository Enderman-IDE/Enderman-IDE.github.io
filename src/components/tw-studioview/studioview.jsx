import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import classNames from 'classnames';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import StudioView from './studioview';
import styles from './studioview.css';

const messages = defineMessages({
    authorAttribution: {
        defaultMessage: 'by {author}',
        description: 'Displayed under commit message to credit author',
        id: 'tw.studioview.authorAttribution'
    },
    hoverText: {
        defaultMessage: 'Commit {title} by {author}',
        description: 'Displayed when hovering over a commit',
        id: 'tw.studioview.hoverText'
    },
    error: {
        defaultMessage: 'There was an error loading the commits.',
        description: 'Displayed when an error occurs',
        id: 'tw.studioview.error'
    }
});

class StudioViewComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelect',
            'ref'
        ]);
    }
    componentDidMount () {
        this.studioView = new StudioView(this.props.id);
        this.studioView.messages.AUTHOR_ATTRIBUTION = this.props.intl.formatMessage(messages.authorAttribution, {
            author: '$author'
        });
        this.studioView.messages.PROJECT_HOVER_TEXT = this.props.intl.formatMessage(messages.hoverText, {
            author: '$author',
            title: '$title'
        });
        this.studioView.messages.LOAD_ERROR = this.props.intl.formatMessage(messages.error);
        this.studioView.loadNextPage();
        this.studioView.onselect = this.handleSelect;
        this.el.appendChild(this.studioView.root);
    }
    handleSelect (id) {
        this.props.onSelect(id);
    }
    ref (el) {
        this.el = el;
    }
    render () {
        return (
            <div
                className={classNames(
                    styles.wrapper
                )}
                ref={this.ref}
            />
        );
    }
}

StudioViewComponent.propTypes = {
    id: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default injectIntl(StudioViewComponent);
