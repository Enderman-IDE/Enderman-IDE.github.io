StudioView.STUDIO_API = 'https://api.github.com/repos/Enderman-IDE/Enderman-IDE.github.io/commits';

StudioView.prototype.loadNextPage = function () {
    if (this.loadingPage) {
        throw new Error('Already loading');
    }
    if (this.ended) {
        throw new Error('No more data to load');
    }

    this.loadingPage = true;
    this.root.setAttribute('loading', '');

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = () => {
        var commits = xhr.response;
        if (!Array.isArray(commits)) {
            this.addErrorElement();
            return;
        }

        for (let commit of commits) {
            this.addProject({
                id: commit.sha,
                title: commit.commit.message,
                author: commit.commit.author.name,
            });
        }

        this.cleanupPlaceholders();
        this.ended = commits.length === 0;
        this.loadingPage = false;
        this.root.removeAttribute('loading');
        this.onpageload();
    };

    xhr.onerror = () => {
        this.root.setAttribute('error', '');
        this.addErrorElement();
        this.ended = true;
        this.cleanupPlaceholders();
    };

    xhr.open('GET', StudioView.STUDIO_API);
    xhr.send();
};
