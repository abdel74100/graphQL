import {
    useQuery,
    gql
} from '@apollo/client';

const apolloQuery = gql`
    {
        launches(limit: 5) {
            launch_date_utc
            launch_success
            rocket {
                rocket_name
            }
            links {
                video_link
            }
            details
        }
    }
`;

export function Apollo() {
    const { loading, error, data } = useQuery(apolloQuery);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error :</p>;
    }

    return data.launches.map(({ launch_date_utc, launch_success, rocket, links, details }, index) => (
        <div className="parent" key={index}>
            <p>Date : {launch_date_utc}</p>
            <p>Launch :
                {
                    launch_success ? ' Failed' : ' Success'
                }
            </p>
            <p>{rocket.rocket_name}</p>
            <a href="{links.video_link}">Video link</a>
            <p>{details}</p>

        </div>
    ));
}