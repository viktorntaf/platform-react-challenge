import {Typography} from "@mui/material";
import {BreedInfoTransformation} from "../lib/transformer";

/**
 * Component for showing the breed info of a selected cat.
 * @param breeds
 * @returns {*}
 * @constructor
 */
const BreedInfo =  ({breeds}) => {
    return breeds.map(breed => {
        return BreedInfoTransformation.map(info => {
            const {key, label, hasMore, isLink} = info;
            if (hasMore) {
                const allInfo = breed[key]
                const infoKeys = Object.keys(allInfo);
                return (
                    <Typography variant="h6" gutterBottom key={key}>
                        {label}: {
                        infoKeys.map(key => (
                            `${key}: ${allInfo[key]}`
                        ))
                    }
                    </Typography>
                )
            }
            if (isLink) {
                return (
                    <Typography variant="h6" gutterBottom key={key}>
                        <a href={breed[key]} target="_blank" rel="noreferrer">{label}</a>
                    </Typography>
                )
            }
            return (
                <Typography variant="h6" gutterBottom key={key}>
                    {label}: {breed[key]}
                </Typography>
            )
        })
    })
}

export default BreedInfo;
