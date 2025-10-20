// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Add scroll event listener to update active navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Simple typewriter effect for hero title (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typewriter effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 100);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Spotify Currently Playing API (Demo Version)
class DemoSpotifyWidget {
    constructor() {
        this.sampleTracks = [
            { name: "Bohemian Rhapsody", artist: "Queen", progress: 45 },
            { name: "Blinding Lights", artist: "The Weeknd", progress: 70 },
            { name: "Save Your Tears", artist: "The Weeknd", progress: 30 },
            { name: "Not Playing", artist: "Spotify", progress: 0 }
        ];
        this.currentTrack = 0;
        this.widget = document.querySelector('.spotify-widget');
        this.trackName = document.querySelector('.track-name');
        this.trackArtist = document.querySelector('.track-artist');
        this.progress = document.querySelector('.progress');
        
        this.initDemo();
    }

    initDemo() {
        this.updateDemo();
        setInterval(() => this.updateDemo(), 10000);
    }

    updateDemo() {
        const track = this.sampleTracks[this.currentTrack];
        
        this.trackName.textContent = track.name;
        this.trackArtist.textContent = track.artist;
        this.progress.style.width = `${track.progress}%`;
        
        if (track.name === "Not Playing") {
            this.widget.classList.remove('playing');
        } else {
            this.widget.classList.add('playing');
        }
        
        this.currentTrack = (this.currentTrack + 1) % this.sampleTracks.length;
    }
}

// GitHub API Integration
class GitHubWidget {
    constructor() {
        this.username = 'your-github-username'; // Change this to your GitHub username
        this.repoCount = document.getElementById('repo-count');
        this.followerCount = document.getElementById('follower-count');
        this.gistCount = document.getElementById('gist-count');
        this.recentActivity = document.getElementById('recent-activity');
        
        this.init();
    }

    async init() {
        try {
            await this.fetchGitHubStats();
            await this.fetchRecentActivity();
        } catch (error) {
            console.error('GitHub widget error:', error);
            this.showError();
        }
    }

    async fetchGitHubStats() {
        const response = await fetch(`https://api.github.com/users/${this.username}`);
        
        if (response.ok) {
            const data = await response.json();
            this.updateStats(data);
        } else {
            this.showError();
        }
    }

    async fetchRecentActivity() {
        const response = await fetch(`https://api.github.com/users/${this.username}/events/public?per_page=1`);
        
        if (response.ok) {
            const events = await response.json();
            this.updateRecentActivity(events[0]);
        } else {
            this.recentActivity.textContent = 'No recent activity';
        }
    }

    updateStats(data) {
        this.repoCount.textContent = data.public_repos || '0';
        this.followerCount.textContent = data.followers || '0';
        this.gistCount.textContent = data.public_gists || '0';
    }

    updateRecentActivity(event) {
        if (!event) {
            this.recentActivity.textContent = 'No recent activity';
            return;
        }

        const activity = this.formatActivity(event);
        this.recentActivity.textContent = activity;
    }

    formatActivity(event) {
        const repo = event.repo.name.replace(`${this.username}/`, '');
        
        switch (event.type) {
            case 'PushEvent':
                return `Pushed to ${repo}`;
            case 'CreateEvent':
                return `Created ${event.payload.ref_type} in ${repo}`;
            case 'WatchEvent':
                return `Starred ${repo}`;
            case 'ForkEvent':
                return `Forked ${repo}`;
            case 'IssuesEvent':
                return `${event.payload.action} issue in ${repo}`;
            case 'PullRequestEvent':
                return `${event.payload.action} PR in ${repo}`;
            default:
                return `Activity in ${repo}`;
        }
    }

    showError() {
        this.repoCount.textContent = '--';
        this.followerCount.textContent = '--';
        this.gistCount.textContent = '--';
        this.recentActivity.textContent = 'Unable to load';
    }
}

// Demo GitHub Widget (for testing without API)
class DemoGitHubWidget {
    constructor() {
        this.repoCount = document.getElementById('repo-count');
        this.followerCount = document.getElementById('follower-count');
        this.gistCount = document.getElementById('gist-count');
        this.recentActivity = document.getElementById('recent-activity');
        
        this.sampleActivities = [
            'Pushed to portfolio-website',
            'Created new repository',
            'Starred awesome-project',
            'Fixed bug in task-app',
            'Merged pull request'
        ];
        this.activityIndex = 0;
        
        this.initDemo();
    }

    initDemo() {
        // Set demo stats
        this.repoCount.textContent = '24';
        this.followerCount.textContent = '18';
        this.gistCount.textContent = '12';
        
        this.updateActivity();
        setInterval(() => this.updateActivity(), 8000);
    }

    updateActivity() {
        this.recentActivity.textContent = this.sampleActivities[this.activityIndex];
        this.activityIndex = (this.activityIndex + 1) % this.sampleActivities.length;
    }
}

// Initialize all widgets when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Spotify Widget
    new DemoSpotifyWidget();
    
    // GitHub Widget - Choose one:
    // For real GitHub API (replace 'your-github-username'):
    // new GitHubWidget();
    
    // For demo version:
    new DemoGitHubWidget();
});