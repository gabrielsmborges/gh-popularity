import axios from "axios";

export const getRepoData = async (repoName: string) => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${repoName}`, {
            headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
            },
        })
        const data = response.data

        const stars = data.stargazers_count
        const forks = data.forks_count
        const watch = data.subscribers_count
    
        const pulls_response = await axios.get(`https://api.github.com/search/issues?q=repo:${repoName}%20is:pr%20is:open&per_page=1`, {
            headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
        })
        const pulls_data = pulls_response.data
        const pulls = pulls_data.total_count

        const issues_response = await axios.get(`https://api.github.com/search/issues?q=repo:${repoName}%20is:issue%20is:open&per_page=1`, {
            headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
        })
        const issues_data = issues_response.data
        const issues = issues_data.total_count
    
        const popularity = computeRepoPopularity(stars, forks, issues, watch, pulls)
  
  
    return { stars, forks, issues, watch, pulls, popularity }
    } catch (error) {
        throw error
    }
  
  }


const computeRepoPopularity = (
    stars: number,
    forks: number,
    issues: number,
    watch: number,
    pulls: number
    ) => {
        // Repos with less than 1k stars will lose points
        // 50k+ stars repos have maximum popularity
        const pointOne = stars < 1000 ? -1: Math.min(stars / 50000, 1)

        // Repos with less than 10 pulls will not gain points
        // Ideal ratio is 1 pull for every 3 issues
        const pointTwo = pulls < 10 ? 0 : Math.min(pulls / issues * 3, 1)

        // Ideal watch/fork ratio is 1:10
        const pointThree = Math.min(watch / forks * 10, 1)

        // Transform 0 - 3 points into 0 - 5 and rounds the result
        return Math.round(Math.max(pointOne + pointTwo + pointThree, 0) * 5 / 3)
  }