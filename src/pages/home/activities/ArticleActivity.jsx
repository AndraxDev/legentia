import React from 'react';
import AppScreenFade from "../../AppScreenFade";
import PropTypes from "prop-types";
import ReadingText from "../../../components/interactive-phrase/ReadingText";

const demoArticleTitle = "Fabula de Rege Aurelio et Regno Lucidorum";
const demoArticle = `
Olim, in terra longinqua et serena, erat regnum nomine Lucidorum, quod fulgebat non solum divitiis sed etiam sapientia. In hoc regno regebat Rex Aurelius, vir prudens, iustus et misericors. Sub eius regimine, populus vivebat in pace, terra florebat, et rivi dulces per campos currebant.
 
Sed pax non semper durat.
 
Uno die, rumor per regnum diffusus est: umbra tenebrosa ex septentrione appropinquabat, exercitus ignotus sub vexillo corvi nigri. Rex Aurelius, quamquam iam senex erat, consilium convocavit. Omnes duces et sapientes regni convenerunt in aula marmorea.
 
Inter eos erat Mira, puella ingeniosa et filia apicarii. Etsi iuvenis erat, vocem audacem habuit:
 
“Non solum gladio defendimur, sed corde. Fortitudo non est in viribus tantum, sed in unitate.”
 
Rex Aurelius verba eius audivit et nutu annuit. Statuit non statim bellum movere, sed exploratores mittere, pacem temptare, et populum instruere ut se protegere possent.
 
Exploratores redierunt cum nuntio: hostes, nomine Umbrosi, fame afflicti et patria perdita, pacem quaerebant. Rex Aurelius, cum consilio Miræ, pactum misericordiae constituit. Umbrosi terras vacuas acceperunt ad colendum, et paulatim facti sunt cives Lucidorum.
 
Per annos, regnum factum est etiam fortius – non per bellum, sed per fidem, sapientiam, et misericordiam.
 
Et ita Lucidorum floruit usque in hodiernum diem, exemplum pacis inter gentes diversas.
`;

function ArticleActivity({onNewIntent}) {
    const quitReading = () => {
        onNewIntent("/home/2");
    }
    return (
        <AppScreenFade>
            <div className={"activity-fullscreen"}>
                <div className={"exercise-header"}>
                    <button className={"exercise-close"} onClick={() => {
                        quitReading()
                    }}><span className={"material-symbols-outlined"}>arrow_back</span></button>
                </div>
                <h2 className={"article-title"}>{demoArticleTitle}</h2>
                <div style={{
                    padding: "24px"
                }}>
                    <ReadingText article={demoArticle} />
                </div>
            </div>
        </AppScreenFade>
    );
}

ArticleActivity.propTypes = {
    onNewIntent: PropTypes.func.isRequired
}

export default ArticleActivity;