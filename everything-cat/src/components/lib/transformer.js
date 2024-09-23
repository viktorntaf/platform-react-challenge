/**
 * A transformer for showing a selected cat's info.
 * @type {[{label: string, key: string},{label: string, key: string},{hasMore: boolean, label: string, key: string},{label: string, key: string},{label: string, key: string},null,null]}
 */
export const BreedInfoTransformation = [
    {
        key: 'name',
        label: 'Breed',
    },
    {
        key: 'description',
        label: 'Breed Description',
    },
    {
        key: 'weight',
        label: 'Weight',
        hasMore: true,
    },
    {
        key: 'origin',
        label: 'Origin Country',
    },
    {
        key: 'temperament',
        label: 'Temperament',
    },
    {
        key: 'life_span',
        label: 'Life Span',
    },
    {
        key: 'wikipedia_url',
        label: 'Wikipedia',
        isLink: true
    }
]