import * as React from "react"
import { createClient } from '@/utils/supabase/server'
import { buttonVariants, Button } from "@/components/ui/button"
import { Plus, Trash2, Pencil } from "lucide-react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function Page() {
  const supabase = createClient()

  //this enables users to view all the data
  const { data: todo } = await supabase.from('todo').select('*')

  //this enables users to view all the data in specific columns
  const { data: specifictodo } = await await supabase
    .from('todo')
    .select('id, priority, content, done')
  //this enables users to view specific data
  const { data: selecttodo } = await supabase
    .from('todo')
    .select('*')
    .eq('content', 'Add the insert data')

  //this enables users to insert data
  // const { data: inserttodo } = await supabase
  // .from('todo')
  // .insert([
  //   { priority:10, content: 'Go to School', done:false },
  //   { priority:20, content: 'Take a walk', done:false  },
  // ])
  // .select()

  //this enables users to edit specific data
  const { data: edittodo } = await supabase
    .from('todo')
    .update({ done: true })
    .eq('id', 1)
    .select()

  //this enables users to delete specific data
  const { data: deletetodo } = await supabase
    .from('todo')
    .delete()
    .eq('id', 47)

  const handleDelete = async (idToDelete: number) => {
    const { error } = await supabase.from('todo').delete().eq('id', idToDelete);
    if (error) {
      console.error('Error deleting todo:', error.message);
    } else {
      console.log("Success Deleting"); // Remove deleted item from todo list
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-lg font-semibold">List of Things</h1>
        <Button><Plus className="h-4 w-4 mr-3" />
       Add a new Item
          </Button>
      </div>
      <Table>
        <TableCaption>This is a todo List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Done</TableHead>
            <TableHead className="text-right">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {specifictodo.map(todo =>
            <TableRow>
              <TableCell className="font-medium">{todo.id}</TableCell>
              <TableCell>{todo.priority}</TableCell>
              <TableCell>{todo.content}</TableCell>
              <TableCell>{todo.done ? "Done" : "Not Done"}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="icon" className='mr-5'>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* 
      <div>
        <pre>{JSON.stringify(specifictodo, null, 2)}</pre>
      </div> */}

    </div>
  );
}
