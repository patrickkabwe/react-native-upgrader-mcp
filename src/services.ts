import fs from 'fs/promises';
import path from 'path';


export const getStableVersion = async () => {
    const response = await fetch(`https://api.github.com/repos/facebook/react-native/releases/latest`);
    const data = await response.json() as { tag_name: string };
    return data.tag_name.replace('v', '');
}

export const getDiff = async (currentVersion: string, toVersion: string): Promise<string> => {
    const url = `https://raw.githubusercontent.com/react-native-community/rn-diff-purge/diffs/diffs/${currentVersion}..${toVersion}.diff`
    const response = await fetch(url);
    if (!response.ok) {
        console.error(`Failed to fetch diff for ${currentVersion} to ${toVersion} let's try getting diff for ${toVersion} to ${currentVersion}`);
        const diff = await getDiff(toVersion, currentVersion);
        return diff;
    }
    const diffData = await response.text();
    return diffData;
}

export const getCurrentReleaseCandidateVersion = async (): Promise<string[]> => {
    const response = await fetch(`https://api.github.com/repos/facebook/react-native/releases`);
    const data = await response.json() as { tag_name: string }[];
    const releaseCandidate = data.find(release => release.tag_name.includes('rc'));
    return releaseCandidate ? [releaseCandidate.tag_name.replace('v', '')] : [];
}
