import joi from 'joi';

interface IBody {
    firstUser: string
    secondUser: string
}

const bodySchema = joi.object({
    firstUser: joi.string().required(),
    secondUser: joi.string().required()
});

export const validateBody = (body: IBody) => {
    const validate = bodySchema.validate(body);
    if(validate.error){
        return { status: false, message: validate.error.details }
    }
    return {status: true};
}