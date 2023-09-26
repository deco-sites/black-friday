
export interface Props{
    title: string;
     /** @format html */
    content: string; 
}

function TextInfo ({title,content}: Props){


    return (
        <div className="content flex flex-col lg:max-w-[1200px] max-w-[95%] mx-auto gap-6 mb-20">
            <h3 class="lg:text-4xl text-xl font-semibold text-black text-center lg:text-start uppercase">{title}</h3>
            <div class="flex flex-col items-left justify-start text-xs lg:text-base text-start" dangerouslySetInnerHTML={{ __html: content }}/>
        </div>
    )
}

export default TextInfo