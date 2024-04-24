import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = createClient()
  const { data: todo, error } = await supabase
  .from('todo')
  .insert([
    { priority: 4, content: 'otherValue' , done:false},
  ])
  .select()

 // const { data: todo } = await supabase.from('todo').select()

  return <pre>{JSON.stringify(todo, null, 2)}</pre>
}
