import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './featured-projects.css';
import { setProjectId } from '../../lib/tw-navigation-utils.js';

class FeaturedProjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commits: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        fetch('https://api.github.com/repos/Enderman-IDE/Enderman-IDE.github.io/commits')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('error!!! the response wasnt ok');
            })
            .then(commits => this.setState({ commits, loading: false }))
            .catch(error => this.setState({ error, loading: false }));
    }

    handleSelect(commitId) {
        console.log('commit selected:', commitId);
    }

    renderCommits() {
        const { commits, loading, error } = this.state;
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}! please report this to our discord server!!</div>;

        return commits.map((commit) => (
            <div key={commit.sha} className={styles.commit}>
                <div className={styles.authorImage}>
                    <a href={commit.commit.author.html_url || `https://github.com/${commit.commit.author.name}`} target="_blank" rel="noopener noreferrer">
                        <img className={styles.authorImage} src={commit.author?.avatar_url || 'default-avatar-url'} alt={commit.commit.author.name} />
                    </a>
                </div>
                <div className={styles.commitAuthor}>
                    <a className={styles.authorLink} href={commit.author?.html_url || `https://github.com/${commit.commit.author.name}`} target="_blank" rel="noopener noreferrer">
                        {commit.commit.author.name}
                    </a>
                </div>
            <div className={styles.commitMessage}>
                <a href={commit.html_url} target="_blank" rel="noopener noreferrer">
                        {commit.commit.message}
                    </a>
                </div>
            </div>
        ));
    }

    render() {
        return (
            <div className={styles.container}>
                {this.renderCommits()}
            </div>
        );
    }
}

FeaturedProjects.propTypes = {
    setProjectId: PropTypes.func,
};

const mapStateToProps = state => ({
    projectId: state.scratchGui.projectState.projectId
});

const mapDispatchToProps = dispatch => ({
    setProjectId: projectId => setProjectId(dispatch, projectId)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeaturedProjects);
