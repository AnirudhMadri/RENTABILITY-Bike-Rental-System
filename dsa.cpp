#include <iostream>
#include <unordered_map>
#include <stack>

using namespace std;

class ListNode
{
public:
    int val;
    ListNode *next;
    ListNode(int x)
    {
        val = x;
        next = nullptr;
    }
};

ListNode *head, *tail;

void printList(ListNode *head)
{
    ListNode *curr = head;
    while (curr != nullptr)
    {
        cout << curr->val << "-->";
        curr = curr->next;
    }
    cout << "Null" << endl;
}

void InsertatLast(int value) // Function for creating a LinkedList
{

    ListNode *newnode = new ListNode(value);
    if (head == nullptr)
        head = newnode, tail = newnode;
    else
        tail = tail->next = newnode;
}

ListNode *SegregatetoOddEven()
{
    ListNode *oddHead = new ListNode(-1), *oddTail = oddHead;
    ListNode *evenHead = new ListNode(-1), *evenTail = evenHead;
    ListNode *curr = head, *temp;
    while (curr)
    {
        temp = curr;
        curr = curr->next;
        temp->next = nullptr;

        if (temp->val & 1)
        {
            oddTail->next = temp;
            oddTail = temp;
        }
        else
        {
            evenTail->next = temp;
            evenTail = temp;
        }
    }
    evenTail->next = oddHead->next;
    return evenHead->next;
}

int main()
{
    InsertatLast(1);
    InsertatLast(2);
    InsertatLast(3);
    InsertatLast(4);
    cout << "Initial LinkedList : " << endl;
    printList(head);
    ListNode *newHead = SegregatetoOddEven();
    cout << "LinkedList After Segregration " << endl;
    printList(newHead);
    return 0;
}