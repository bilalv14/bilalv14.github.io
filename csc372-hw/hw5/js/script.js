document.addEventListener("DOMContentLoaded", function() {
    const searchBtn = document.getElementById('searchBtn');
    const searchField = document.getElementById('searchField');


    loadRepos('bilalv14');  //


    searchBtn.addEventListener('click', () => {
        const username = searchField.value;
        if (username) {
            loadRepos(username);
        }
    });
});

function loadRepos(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const repoGallery = document.getElementById('repoGallery');
            repoGallery.innerHTML = '';
            data.forEach(repo => {
                const repoElement = document.createElement('div');
                repoElement.className = 'repo';
                repoElement.innerHTML = `
                    <h3><i class="fa-brands fa-github"></i> <a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                    <p>${repo.description || 'No description available'}</p>
                    <span>Created: ${new Date(repo.created_at).toDateString()}</span><br>
                    <span>Updated: ${new Date(repo.updated_at).toDateString()}</span><br>
                    <span>Watchers: ${repo.watchers_count}</span>
                    <p id="languages-${repo.id}">Languages: Loading...</p>
                    <p id="commits-${repo.id}">Commits: Loading...</p>
                `;
                repoGallery.appendChild(repoElement);
                fetchRepoDetails(repo.languages_url, repo.commits_url.replace('{/sha}', ''), repo.id);
            });
        })
        .catch(error => {
            console.error('Failed to fetch data: ', error);
            alert('Failed to load repository data.');
        });
}

function fetchRepoDetails(languagesUrl, commitsUrl, repoId) {
    // Fetch languages
    fetch(languagesUrl)
        .then(response => response.json())
        .then(languages => {
            const languagesElement = document.getElementById(`languages-${repoId}`);
            languagesElement.innerHTML = `Languages: ${Object.keys(languages).join(', ')}`;
        })
        .catch(error => {
            console.error('Failed to fetch languages: ', error);
            document.getElementById(`languages-${repoId}`).innerHTML = 'Languages: Failed to load';
        });

    // Fetch commits
    fetch(commitsUrl)
        .then(response => response.json())
        .then(commits => {
            const commitsElement = document.getElementById(`commits-${repoId}`);
            commitsElement.innerHTML = `Commits: ${commits.length || 'Not available'}`;
        })
        .catch(error => {
            console.error('Failed to fetch commits: ', error);
            document.getElementById(`commits-${repoId}`).innerHTML = 'Commits: Not available';
        });
}

