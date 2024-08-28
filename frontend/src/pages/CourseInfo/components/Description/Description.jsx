
import { DescriptionWrapper, P, TabDescription, Title } from './styles'
export default function Description({description,Curriculum}) {
  return (
<TabDescription>
{( description) && (<> <DescriptionWrapper> <Title>Description:</Title><P> {description} . </P> </DescriptionWrapper> </>  )}
 {(Curriculum) && (<> <DescriptionWrapper><Title>Curriculum:</Title><P> {Curriculum} .</P> </DescriptionWrapper> </>  )}
</TabDescription>
  )
}
